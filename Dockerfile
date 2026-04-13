ARG DISTROLESS_SHA256=sha256:1e2c4183b84122745dc2236b9b43bee09c54db091044d593eb8f755a954ad22a
FROM gcr.io/distroless/nodejs24-debian13@${DISTROLESS_SHA256}
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
