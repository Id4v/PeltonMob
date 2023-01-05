import {useDispatch} from "react-redux";
import {logoutAction} from "@app/features/Login/userSlice";
import {useEffect} from "react";

export default function Logout() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutAction());
    }, [])

  return (null);
}