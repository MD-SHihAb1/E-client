import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { updateModal } from "../redux/features/authSlice";

const useAuth = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
    const user = useAppSelector((state) => state.authReducer.user);

    const requireAuth = (action: () => void) => {
        if (!isLoggedIn) {
            dispatch(updateModal(true));
        } else {
            action();
        }
    };

    return { requireAuth, isLoggedIn, user };
};

export default useAuth;
