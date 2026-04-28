export function validate(doc, catalog) {
  const errors = [];

  if (!doc || typeof doc !== "object" || Array.isArray(doc)) {
    return [{ path: "", message: "Document must be an object" }];
  }

  for (const field of catalog.envelope.required) {
    if (!(field in doc)) {
      errors.push({ path: field, message: `Envelope missing required field: ${field}` });
    }
  }

  if (doc.catalog && doc.catalog !== catalog.version) {
    errors.push({
      path: "catalog",
      message: `Unknown catalog: expected ${catalog.version}, got ${doc.catalog}`
    });
  }

  if (doc.parts !== undefined && !Array.isArray(doc.parts)) {
    errors.push({ path: "parts", message: "parts must be an array" });
  } else if (Array.isArray(doc.parts)) {
    if (doc.parts.length !== 1) {
      errors.push({ path: "parts", message: "parts must contain exactly one root component" });
    }
    doc.parts.forEach((node, index) => {
      if (index === 0 && node?.component && node.component !== catalog.envelope.root_component) {
        errors.push({
          path: "parts[0]",
          message: `Root must be ${catalog.envelope.root_component}`
        });
      }
      validateNode(node, `parts[${index}]`, catalog, errors);
    });
  }

  return errors;
}

function validateNode(node, path, catalog, errors) {
  if (!node || typeof node !== "object" || Array.isArray(node)) {
    errors.push({ path, message: "Node must be an object" });
    return;
  }
  if (typeof node.component !== "string") {
    errors.push({ path: `${path}.component`, message: "component must be a string" });
    return;
  }

  const schema = catalog.components[node.component];
  if (!schema) {
    errors.push({ path, message: `Unknown component: ${node.component}` });
    return;
  }

  const props = node.props || {};
  if (typeof props !== "object" || Array.isArray(props)) {
    errors.push({ path: `${path}.props`, message: "props must be an object" });
    return;
  }

  for (const [propName, propSchema] of Object.entries(schema.props || {})) {
    const present = propName in props;
    if (propSchema.required && !present) {
      errors.push({
        path: `${path}.props.${propName}`,
        message: `Missing required prop: ${propName}`
      });
      continue;
    }
    if (present) {
      validateProp(props[propName], propSchema, `${path}.props.${propName}`, propName, errors);
    }
  }

  for (const key of Object.keys(props)) {
    if (!(key in (schema.props || {}))) {
      errors.push({ path: `${path}.props.${key}`, message: `Unknown prop: ${key}` });
    }
  }

  if (schema.children === "required" && !Array.isArray(node.children)) {
    errors.push({ path: `${path}.children`, message: `${node.component} requires children` });
  }
  if (schema.children === "forbidden" && node.children !== undefined) {
    errors.push({ path: `${path}.children`, message: `${node.component} must not have children` });
  }
  if (Array.isArray(node.children)) {
    node.children.forEach((child, index) => {
      validateNode(child, `${path}.children[${index}]`, catalog, errors);
    });
  }
}

function validateProp(value, schema, path, name, errors) {
  const actualType = value === null ? "null" : Array.isArray(value) ? "array" : typeof value;

  if (schema.type === "array") {
    if (!Array.isArray(value)) {
      errors.push({ path, message: `Prop ${name}: expected array, got ${actualType}` });
      return;
    }
    if (schema.items) {
      value.forEach((item, index) => {
        validateProp(item, schema.items, `${path}[${index}]`, `${name}[${index}]`, errors);
      });
    }
    return;
  }

  if (schema.type === "object") {
    if (actualType !== "object" || value === null || Array.isArray(value)) {
      errors.push({ path, message: `Prop ${name}: expected object, got ${actualType}` });
      return;
    }
    if (schema.props) {
      validateObjectProps(value, schema.props, path, errors);
    }
    return;
  }

  if (actualType !== schema.type) {
    errors.push({ path, message: `Prop ${name}: expected ${schema.type}, got ${actualType}` });
    return;
  }

  if (schema.enum && !schema.enum.includes(value)) {
    errors.push({
      path,
      message: `Prop ${name}: value ${JSON.stringify(value)} not in enum: ${schema.enum.join(", ")}`
    });
  }

  if (schema.pattern && typeof value === "string" && !new RegExp(schema.pattern).test(value)) {
    errors.push({ path, message: `Prop ${name}: value does not match pattern ${schema.pattern}` });
  }
}

function validateObjectProps(value, propSchemas, path, errors) {
  for (const [propName, propSchema] of Object.entries(propSchemas)) {
    const present = propName in value;
    if (propSchema.required && !present) {
      errors.push({ path: `${path}.${propName}`, message: `Missing required prop: ${propName}` });
      continue;
    }
    if (present) {
      validateProp(value[propName], propSchema, `${path}.${propName}`, propName, errors);
    }
  }

  for (const key of Object.keys(value)) {
    if (!(key in propSchemas)) {
      errors.push({ path: `${path}.${key}`, message: `Unknown prop: ${key}` });
    }
  }
}
