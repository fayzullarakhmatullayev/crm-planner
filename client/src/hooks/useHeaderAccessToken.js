import { useSelector } from "react-redux";

export const useHeaderAccessToken = () => {
  const { access_token } = useSelector((state) => state.user);
  return {
    headers: {
      access_token,
    },
  };
};
