# Supabase Maintenance Guide

## Functions

### Naming Conventions

- Function names should be all lowercase and use underscores to separate words. It should be descriptive of what the function does.
- `trigger` functions that are supposed to be called by the database itself in response to an event, should be prefixed with `_system_`.
- Functions that are supposed be called only by other functions should be prefixed with `_util_`.

### Access Control

- Use `SECURITY DEFINER` judiciously
- Set explicit empty search_path
- Use schema-qualified names
- Grant execute permissions only where necessary

### Security Best Practices

1. Always use schema-qualified names
2. Set search_path = '' for SECURITY DEFINER functions
3. Validate all inputs
4. Use proper error handling
5. Implement proper access controls
6. Follow least privilege principle

### Linting

All functions must pass `plpgsql_check`. Run the following to check:

### CI/CD Integration

The project includes automated linting in the CI/CD pipeline. See `.github/workflows/lint.yml` for details.
