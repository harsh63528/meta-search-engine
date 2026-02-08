/**
 * Validates registration input
 * @param {Object} body - Request body with name, email, password
 * @returns {{ valid: boolean, errors: string[] }}
 */
export const validateRegister = (body) => {
  const errors = [];
  const { name, email, password } = body;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (!email || typeof email !== "string") {
    errors.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Invalid email format");
    }
  }

  if (!password || typeof password !== "string") {
    errors.push("Password is required");
  } else if (password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Validates login input
 * @param {Object} body - Request body with email, password
 * @returns {{ valid: boolean, errors: string[] }}
 */
export const validateLogin = (body) => {
  const errors = [];
  const { email, password } = body;

  if (!email || typeof email !== "string" || email.trim().length === 0) {
    errors.push("Email is required");
  }

  if (!password || typeof password !== "string" || password.length === 0) {
    errors.push("Password is required");
  }

  return {
    valid: errors.length === 0,
    errors
  };
};