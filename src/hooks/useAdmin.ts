import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery<boolean>({
        queryKey: ['admin', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get<{ admin: boolean }>(`/users/${user?.email}`);
            return res.data.admin;
        },
        enabled: !!user?.email, // Ensure query runs only if user.email is available
    });

    return [isAdmin, isAdminLoading] as [boolean | undefined, boolean];
};

export default useAdmin;
