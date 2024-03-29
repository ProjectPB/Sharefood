import useAuth from "../hooks/useAuth";

const WithAuth = (props: any) => useAuth(props) && props.children;

export default WithAuth;