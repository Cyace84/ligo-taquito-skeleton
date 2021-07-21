type storage_type       is nat
type return             is list (operation) * storage_type

[@inline] const no_operations : list(operation) = nil;