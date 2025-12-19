import { useEffect } from "react";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate, useParams } from "react-router-dom";
import { buildLocalizedPath } from "@/utils";

export default function SignUpPage() {
  const { openSignUp } = useClerk();
  const navigate = useNavigate();
  const { lang } = useParams();

  useEffect(() => {
    openSignUp({
      afterSignInUrl: buildLocalizedPath("transform", lang),
      afterSignUpUrl: buildLocalizedPath("transform", lang),
    });

    navigate(buildLocalizedPath("/", lang), { replace: true });
  }, []);

  return null;
}
