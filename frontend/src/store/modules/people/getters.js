export default {
  friends(state){
    return state.friends;
  },
  friendRequests(state){
    return state.friendRequests;
  },
  people(state){
    return state.people;
  },
  findPeople(state){
    let allPeople = state.people;
    let findPeople = [];
    let idToRemove = new Set();
    state.friends.forEach(element => {
      idToRemove.add(element.senderId);
      idToRemove.add(element.receiverId);
    });
    allPeople.forEach(element => {
      if(!idToRemove.has(element._id)){
        findPeople.push(element)
      }
    });
    return findPeople;
  },
  peopleDict(state){
    return state.peopleDict;
  }
}