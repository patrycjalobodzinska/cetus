{
  description = "Nix-flake-based development environment for cetusprocomv2 frontend";

  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    inputs@{ flake-parts, nixpkgs, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];

      perSystem =
        { pkgs, ... }:
        {
          devShells.devShell = pkgs.mkShell {
            packages = with pkgs; [
              nodejs_24
              pnpm
              typescript

              oxlint
              oxfmt
              hadolint
              typescript-go
              docker-ls
              dockerfile-language-server
              docker-compose-language-service
            ];
          };

          formatter = pkgs.nixfmt;
        };
    };
}
