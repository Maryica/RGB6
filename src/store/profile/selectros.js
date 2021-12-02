export const profileSelector = (props) => (state) => {
    console.log("profileSelector");
    // map/filter/search
    return state.profile;
  };
  
  export const profileNameSelector = (state) => {
    console.log("profileNameSelector");
    // map/filter/search
    return state.profile.firstName;
  };