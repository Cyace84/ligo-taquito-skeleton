#include "../partial/example_types.ligo"
#include "../partial/example_methods.ligo"
#include "../partial/example_views.ligo"

type parameter_t        is
  | Example               of example_param_t
  | Example_2             of example_param_t

function main(
  const action          : parameter_t;
  const s               : storage_t)
                        : return_t is
  case action of
  | Example(params)     -> (no_operations, example(params, s))
  | Example_2(params)   -> (no_operations, example(params, s))

  end
