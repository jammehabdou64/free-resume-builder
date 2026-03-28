import { config } from "jcc-express-mvc";

function appBase(): string {
  let u = String(config.get("APP_URL", "") ?? "")
    .trim()
    .replace(/\/$/, "");
  if (!u) u = "http://localhost:5500";
  if (!/^https?:\/\//i.test(u)) u = `http://${u}`;
  return u;
}

function defaultRedirect(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${appBase()}${p}`;
}

/**
 * Laravel `config/services.php`–style OAuth keys for Socialite.
 * Env: `{PROVIDER}_CLIENT_ID`, `{PROVIDER}_CLIENT_SECRET`, optional `{PROVIDER}_REDIRECT_URI`.
 */
export const service = {
  social: {
    google: {
      client_id: config.get("GOOGLE_CLIENT_ID", ""),
      client_secret: config.get("GOOGLE_CLIENT_SECRET", ""),
      redirect:
        config.get("GOOGLE_REDIRECT_URI", "") ||
        defaultRedirect("/auth/google/callback"),
    },
    github: {
      client_id: config.get("GITHUB_CLIENT_ID", ""),
      client_secret: config.get("GITHUB_CLIENT_SECRET", ""),
      redirect:
        config.get("GITHUB_REDIRECT_URI", "") ||
        defaultRedirect("/auth/github/callback"),
    },
    facebook: {
      client_id: config.get("FACEBOOK_CLIENT_ID", ""),
      client_secret: config.get("FACEBOOK_CLIENT_SECRET", ""),
      redirect:
        config.get("FACEBOOK_REDIRECT_URI", "") ||
        defaultRedirect("/auth/facebook/callback"),
    },
    gitlab: {
      url: String(
        config.get("GITLAB_URL", "https://gitlab.com") ?? "https://gitlab.com"
      ).replace(/\/$/, ""),
      client_id: config.get("GITLAB_CLIENT_ID", ""),
      client_secret: config.get("GITLAB_CLIENT_SECRET", ""),
      redirect:
        config.get("GITLAB_REDIRECT_URI", "") ||
        defaultRedirect("/auth/gitlab/callback"),
    },
    twitter: {
      client_id: config.get("TWITTER_CLIENT_ID", ""),
      client_secret: config.get("TWITTER_CLIENT_SECRET", ""),
      redirect:
        config.get("TWITTER_REDIRECT_URI", "") ||
        defaultRedirect("/auth/twitter/callback"),
    },
    slack: {
      client_id: config.get("SLACK_CLIENT_ID", ""),
      client_secret: config.get("SLACK_CLIENT_SECRET", ""),
      redirect:
        config.get("SLACK_REDIRECT_URI", "") ||
        defaultRedirect("/auth/slack/callback"),
    },
  },
};
