#include "../partial/ExampleTypes.ligo"
#include "../partial/ExampleMethods.ligo"

type parameter_type     is
  | Example             of example_param_type
  | Example_2           of example_param_type


function main(
  const action          : parameter_type;
  const s               : storage_type)
                        : return is
  case action of
    Example(params)           -> (no_operations, example(params, s))
  | Example_2(params)         -> (no_operations, example(params, s))

  end
