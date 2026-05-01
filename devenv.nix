{
  pkgs,
  ...
}:
{
  env.npm_config_store_dir = ".pnpm-store";
  languages.javascript = {
    enable = true;
    pnpm = {
      enable = true;
      install.enable = true;
    };
  };
  languages.typescript.enable = true;
  packages = [
    pkgs.oxlint
    pkgs.oxfmt
    pkgs.hadolint
    pkgs.typescript-go
    pkgs.docker-ls
    pkgs.dockerfile-language-server-nodejs
    pkgs.docker-compose-language-service
  ];
}
