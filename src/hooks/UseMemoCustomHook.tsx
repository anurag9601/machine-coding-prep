import { useRef } from "react";

const useMemoCustomHook = (cd: Function, dependency: any[]) => {
  const ref = useRef<any>({
    storedData: undefined,
    storedDependency: undefined,
  });

  if (
    !ref.current.storedData ||
    !bothArrayAreSame(ref.current.storedDependency, dependency)
  ) {
    ref.current.storedData = cd();
    ref.current.storedDependency = dependency;
  }

  return ref.current.storedData;
};

function bothArrayAreSame(storedDependency: any[], currDependency: any[]) {
  if (
    !storedDependency ||
    !currDependency ||
    storedDependency.length !== currDependency.length
  ) {
    return false;
  }

  for (let i = 0; i < storedDependency.length; i++) {
    if (storedDependency[i] !== currDependency[i]) {
      return false;
    }
  }

  return true;
}

export default useMemoCustomHook;
