# Security Policy

## Supported Versions

This repository is used for security evaluation scenarios. Security fixes are tracked through pull requests targeting `main`.

## Reporting a Vulnerability

If you discover a vulnerability:

1. Do **not** open a public issue with exploit details.
2. Open a private security advisory in GitHub Security Advisories for this repository.
3. Include reproduction steps, impact, and suggested remediation.
4. Reference affected entries in `SECURITY-EVAL.md`.

## GHAS Controls in this Repository

- CodeQL code scanning (`.github/workflows/codeql*.yml`)
- Dependabot updates and dependency review (`.github/dependabot.yml`, `.github/workflows/dependency-review.yml`)
- Secret scanning alert gate (`.github/workflows/secret-scanning-alerts.yml`)
- Security merge gate (`.github/workflows/security-gate.yml`)
- Third-party SARIF ingestion (`.github/workflows/sarif-upload.yml`)
