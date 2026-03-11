/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates = []) {
  // private state
  const candidateMap = new Map(candidates.map(c => [c.id, c]));
  const votes = Object.fromEntries(candidates.map(c => [c.id, 0]));
  const registered = new Set();
  const voted = new Set();

  return {
    registerVoter(voter) {
      if (!voter?.id || typeof voter.age !== "number" || voter.age < 18 || registered.has(voter.id)) {
        return false;
      }
      registered.add(voter.id);
      return true;
    },

    castVote(voterId, candidateId, onSuccess, onError) {
      const fail = msg => typeof onError === "function" ? onError(msg) : null;
      if (!registered.has(voterId)) return fail("voter_not_registered");
      if (!candidateMap.has(candidateId)) return fail("candidate_not_found");
      if (voted.has(voterId)) return fail("already_voted");

      votes[candidateId]++;
      voted.add(voterId);
      return typeof onSuccess === "function" ? onSuccess({ voterId, candidateId }) : null;
    },

    getResults(sortFn) {
      let result = Array.from(candidateMap.values()).map(c => ({
        ...c,
        votes: votes[c.id] || 0
      }));
      return typeof sortFn === "function" ? result.sort(sortFn) : result.sort((a, b) => b.votes - a.votes);
    },

    getWinner() {
      const results = this.getResults();
      return results.length && results.some(r => r.votes > 0) ? results[0] : null;
    }
  };
}

export function createVoteValidator(rules = {}) {
  return voter => {
    if (!voter || typeof voter !== "object") return { valid: false, reason: "invalid_voter" };
    for (const field of rules.requiredFields || []) if (!(field in voter)) return { valid: false, reason: `missing_${field}` };
    if (rules.minAge && voter.age < rules.minAge) return { valid: false, reason: "age_requirement_not_met" };
    return { valid: true };
  };
}

export function countVotesInRegions(region) {
  if (!region || typeof region !== "object") return 0;
  const votesHere = region.votes || 0;
  const subTotal = (region.subRegions || []).reduce((sum, sub) => sum + countVotesInRegions(sub), 0);
  return votesHere + subTotal;
}

export function tallyPure(tally = {}, candidateId) {
  return { ...tally, [candidateId]: (tally[candidateId] || 0) + 1 };
}