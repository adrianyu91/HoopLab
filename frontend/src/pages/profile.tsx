import { useAuth } from "react-oidc-context";

function Profile() {
  const auth = useAuth();
return (
    <div>
      <pre> Hello: {auth.user?.profile.email} </pre>
      <pre> ID Token: {auth.user?.id_token} </pre>
      <pre> Access Token: {auth.user?.access_token} </pre>
      <pre> Refresh Token: {auth.user?.refresh_token} </pre>
    </div>
  );
}
export default Profile;