function example(
  const param           : example_param_type;
  var s                 : storage_type)
                        : storage_type is
  block {
    if param = 1n then s.foo := 42n
    else failwith("Example");
} with s