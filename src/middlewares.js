export const logger =
  store =>
    next => {
      console.debug(next)

      return action => {
        console.group(action.type)
        console.debug(action);
        let result = next(action);
        console.debug(result);
        console.groupEnd();

        return result;
      }
    }