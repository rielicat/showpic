/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState, FormEvent } from "react";
import { FormData } from "interfaces/forms";
import { Link, useHistory } from "react-router-dom";
import { doesUsernameExist } from "services/firebase";
import FirebaseContext from "context/firebase";

import Img from "components/img";

import * as ROUTES from "constants/routes";
import { capitalize } from "helpers/format";
import useAuthListener from "hooks/use-auth-listener";

interface Props {
  action: "login" | "register";
}

export default function Authentication(props: Props) {
  const { action } = props;

  const history = useHistory();
  const { user } = useAuthListener();
  const { firestore, auth } = useContext(FirebaseContext);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({} as FormData);
  const [payload, setPayload] = useState({} as any);

  const [error, setError] = useState("");
  const isInvalid =
    Object.values(payload).some((value) => value === "") ||
    Object.values(payload).length < 1;

  useEffect(() => {
    document.title = `${capitalize(action)} - Instagram`;
  }, [action]);

  useEffect(() => {
    import(`../data/forms/${action}.json`).then((res) => setFormData(res));
  }, [action]);

  useEffect(() => {
    if (user.uid) history.replace(ROUTES.DASHBOARD);
  }, [user]);

  const handleAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      action === "login"
        ? await auth.signInWithEmailAndPassword(payload.email, payload.password)
        : await handleSignUp();
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setPayload({});
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    const { password } = payload;
    if (!(await doesUsernameExist(payload.username))) {
      const createdUser = await auth.createUserWithEmailAndPassword(
        payload.email,
        password
      );
      await createdUser.user?.updateProfile({ displayName: payload.username });
      await firestore.collection("users").add({
        userId: createdUser?.user?.uid,
        followers: [],
        following: [],
        dateCreated: Date.now(),
        ...payload,
      });
    } else {
      throw new Error("Username is already taken, please try another.");
    }
  };

  const handleChange = (key: string, value: string) => {
    payload[key] = value;
    setPayload({ ...payload });
  };

  return (
    <div className="container flex mx-auto justify-center max-w-screen-md items-center h-screen">
      <div className="hidden md:flex w-3/5 justify-center">
        <Img
          skeletonSize={{ height: 400, width: 280 }}
          src={"/images/iphone-with-profile.jpg"}
          alt="iPhone with Instagram app"
        />
      </div>
      <div className="flex flex-col w-80 md:w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <Img
              skeletonSize={{ width: 206, height: 58 }}
              src={"/images/logo.png"}
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleAuth}>
            {formData?.fields
              ?.sort((a, b) => (a.position > b.position ? 1 : -1))
              .map((e) => (
                <input
                  value={payload[e.key] || ""}
                  className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                  onChange={({ target }) => handleChange(e.key, target.value)}
                  maxLength={e.maxLength || 250}
                  {...e}
                />
              ))}
            <button
              disabled={isInvalid || loading}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold capitalize ${
                (isInvalid || loading) && "opacity-50"
              }`}
            >
              {formData?.buttonText}
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            {action === "login" ? (
              <>
                Don't have an account?{" "}
                <Link
                  to={ROUTES.SIGNUP}
                  className="font-bold text-blue-medium cursor-pointer"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                Have an account?{" "}
                <Link
                  to={ROUTES.LOGIN}
                  className="font-bold text-blue-medium cursor-pointer"
                >
                  Login
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
