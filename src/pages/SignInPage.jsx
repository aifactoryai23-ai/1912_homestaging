import { useEffect } from "react";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate, useParams } from "react-router-dom";
import { buildLocalizedPath } from "@/utils";

export default function SignInPage() {
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const { lang } = useParams();

  useEffect(() => {
    openSignIn({
      afterSignInUrl: buildLocalizedPath("transform", lang),
      afterSignUpUrl: buildLocalizedPath("transform", lang),
    });

    // После открытия модалки, вернуть пользователя обратно.
    navigate(buildLocalizedPath("/", lang), { replace: true });
  }, []);

  return null; 
}
