import { combineReducers } from "redux";

import user from "./user/user-reducer";
import volenteer from "./Volenteer/volenteer-reducer";
import client from "./Client/client-reducer";
import event from "./Event/event-reducer";
import stat from "./Stat/stat-reducer";

export default combineReducers({ stat, user, volenteer, client, event });
