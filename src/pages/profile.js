import { useMemo, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  togleVisibleProfile,
  profileSelector,
  profileNameSelector,
} from "../store/profile";
import { ProfileForm } from "../components";

export const ProfilePage = () => {
  const [count, setCount] = useState(0);

  const profileSelectorByMemo = useMemo(() => {
    return profileSelector("test props");
  }, []);

  const { isVisibleProfile, firstName, lastName, ...profile } = useSelector(
    profileSelectorByMemo,
    shallowEqual
  );

  const s2 = useSelector(profileNameSelector, (prev, next) => next !== prev);

  const dispatch = useDispatch();

  return (
    <div>
      <h1>Profile {s2}</h1>

      {/* @TODO вынести в отдельны компонент */}
      {isVisibleProfile && (
        <div>
          <h2>firstName: {firstName}</h2>
          <h2>lastName: {lastName}</h2>
          <h2>phone: {profile.phone}</h2>
        </div>
      )}

      <button onClick={() => dispatch(togleVisibleProfile())}>
        togleVisibleProfile
      </button>

      <button onClick={() => setCount(count + 1)}>count {count}</button>

      <ProfileForm firstName={firstName} lastName={lastName} {...profile} />
    </div>
  );
};