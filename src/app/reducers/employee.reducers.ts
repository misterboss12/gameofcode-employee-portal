import { EmployeeActions, EmployeeActionType } from '../actions/employee.actions';
import { EmployeeState } from '../states/employee.states';
import * as _ from 'lodash';

export function employeeReducer(state: EmployeeState, action: EmployeeActions) {
  switch (action.type) {
    /****************** EMPLOYEE ACTIONS ******************/
    case EmployeeActionType.GET_EMPLOYEE: {
      return { ...state };
    }

    case EmployeeActionType.GET_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        employee: action.payload,
        conferences: action.payload.conferences,
        skills: action.payload.skills,
      };
    }

    case EmployeeActionType.GET_EMPLOYEE_FAILED: {
      return { ...state };
    }

    /****************** CONFERENCES ACTIONS ******************/
    case EmployeeActionType.ADD_CONFERENCE: {
      return {
        ...state,
      };
    }

    case EmployeeActionType.ADD_CONFERENCE_FAILED: {
      return { ...state };
    }

    case EmployeeActionType.ADD_CONFERENCE_SUCCESS: {
      // state elements/properties are immutable
      // copy needs to be made
      let newState = state['conferences'];
      newState = JSON.parse(JSON.stringify(newState));
      newState.push(action.payload);
      return {
        ...state,
        conferences: [...state['conferences'], action.payload],
      };
    }

    case EmployeeActionType.UPDATE_CONFERENCE: {
      return {
        ...state,
      };
    }

    case EmployeeActionType.UPDATE_CONFERENCE_SUCCESS: {
      let newState = state['conferences'];
      newState = JSON.parse(JSON.stringify(newState));
      const index = newState.findIndex((conference) => conference.id === action.payload.id);
      newState[index] = action.payload;
      return {
        ...state,
        conferences: newState,
      };
    }

    case EmployeeActionType.UPDATE_CONFERENCE_FAILED: {
      return { ...state };
    }

    case EmployeeActionType.DELETE_CONFERENCE: {
      return {
        ...state,
      };
    }

    case EmployeeActionType.DELETE_CONFERENCE_SUCCESS: {
      let newState = state['conferences'];
      newState = JSON.parse(JSON.stringify(newState));
      const index = newState.findIndex((item) => item.id === action.payload.id);
      newState.splice(index, 1);
      return {
        ...state,
        conferences: newState,
      };
    }

    case EmployeeActionType.DELETE_CONFERENCE_FAILED: {
      return { ...state };
    }

    /****************** SKILL ACTIONS ******************/

    case EmployeeActionType.ADD_SKILL: {
      return {
        ...state,
      };
    }

    case EmployeeActionType.ADD_SKILL_FAILED: {
      return { ...state };
    }

    case EmployeeActionType.ADD_SKILL_SUCCESS: {
      // state elements/properties are immutable
      // copy needs to be made
      return {
        ...state,
        skills: [...state['skills'], action.payload],
      };
    }

    case EmployeeActionType.UPDATE_SKILL: {
      return {
        ...state,
      };
    }

    case EmployeeActionType.UPDATE_SKILL_SUCCESS: {
      let newState = state['skills'];
      newState = JSON.parse(JSON.stringify(newState));
      const index = newState.findIndex((skill) => skill.id === action.payload.id);
      newState[index] = action.payload;
      return {
        ...state,
        skills: newState,
      };
    }

    case EmployeeActionType.UPDATE_SKILL_FAILED: {
      return { ...state };
    }

    case EmployeeActionType.DELETE_SKILL: {
      return {
        ...state,
      };
    }

    case EmployeeActionType.DELETE_SKILL_SUCCESS: {
      let newState = state['skills'];
      newState = JSON.parse(JSON.stringify(newState));
      const index = newState.findIndex((item) => item.id === action.payload.id);
      newState.splice(index, 1);
      return {
        ...state,
        skills: newState,
      };
    }

    case EmployeeActionType.DELETE_SKILL_FAILED: {
      return { ...state };
    }

    /****************** HOLIDAYS ACTIONS ******************/
    case EmployeeActionType.GET_NON_WORKING_HOLIDAYS: {
      return { ...state };
    }

    case EmployeeActionType.GET_NON_WORKING_HOLIDAYS_SUCCESS: {
      return {
        ...state,
        holidays: action.payload,
      };
    }

    case EmployeeActionType.GET_NON_WORKING_HOLIDAYS_FAILED: {
      return { ...state };
    }

    default:
      return { ...state };
  }
}
