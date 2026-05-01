ARG BASE_IMAGE=gcr.io/distroless/nodejs24-debian13
ARG IMAGE_SHA=sha256:f16acace4aa70086d4a2caad6c716f01e3e2fe0dd8274c4530c7c17d987bdb1a
FROM ${BASE_IMAGE}@${IMAGE_SHA}
WORKDIR /app
ENV NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  PORT=3000 \
  HOSTNAME="0.0.0.0"
EXPOSE 3000/tcp
COPY ["./public", "./public"]
COPY --chown=65532:65532 ["./.next/standalone", "./"]
COPY --chown=65532:65532 ["./.next/static", "./.next/static"]
USER 65532
CMD ["server.js"]
