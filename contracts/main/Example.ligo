#include "../partial/ExampleTypes.ligo"
#include "../partial/ExampleMethods.ligo"

type parameter_type is
  | Example               of nat


function main(
  const action          : parameter_type;
  const s               : storage_type)
                        : return is
  case action of
    Example(_params)           -> (no_operations, example(s))

  end
