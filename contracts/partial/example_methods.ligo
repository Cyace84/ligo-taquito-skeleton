function example(
  const param           : example_param_t;
  var s                 : storage_t)
                        : storage_t is
  block {
    if param = 1n then s.foo := 42n
    else failwith("Example");
} with s