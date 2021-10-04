import GameSettings from './GameSettings';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { gameState, setGame } from '../../state-slices/multiplayer/game-slice';
import { Button, Input } from '@material-ui/core';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { gameByName, getGame } from '../../graphql/queries';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import config from '../../aws-exports';
import { createGame, updateGame } from '../../graphql/mutations';
import { Game } from '../../models/game';
import { authState, loginUserReducer } from '../../state-slices/auth/auth-slice';
import * as gameUtil from '../../utilities/game-utility'
import { errorState, setErrorSeverity, showSnackbar, hideErrorMessage } from '../../state-slices/error/errorSlice';
import Players from './Players';

Amplify.configure(config);

/** This React component is a splash screen/landing page for the multiplayer quiz game.
 * 
 *  If no game is currently defined, a lobby will be rendered which allows users to 
 *      define game settings and create a new game or join an existing game by ID.
 * 
 *  @author Sean Dunn, Colby Wall, Heather Guilfoyle, John Callahan
 **/

function GameLounge() {

    const [nickName, setNickName] = useState("");
    
    const game = useSelector(gameState);
    const user = useSelector(authState);
    const error = useSelector(errorState);
    const dispatch = useDispatch();
    let id = useRef('');
    let history = useHistory();

    async function fetchGame() {
        console.log(id.current);
        let resp = await (API.graphql(graphqlOperation(getGame, {id: id.current})) as Promise<GraphQLResult>);
        // @ts-ignore
        
        let game: Game = {...resp.data.getGame};
        
        //game already exists
        console.log(resp)
        if(game.id !== undefined){

            if(game.matchState === 0){
                //check to see if game capacity is full
                if(game.players.length < game.capacity){
        // Set the user into the list of players
        let baseUser: any;
        if (user.authUser) {
            baseUser = {
                id: user.authUser.id,
                username: user.authUser.username,
                answered: false,
                answeredAt: new Date().toISOString(),
                answeredCorrectly: false,
                placing: -1,
                streak: 0,
                points: 0
            };
        } else {
            baseUser = {
                id: Math.random().toString(36).substr(2, 5),
                username: nickName,
                answered: false,
                answeredAt: new Date().toISOString(),
                answeredCorrectly: false,
                placing: -1,
                streak: 0,
                points: 0
            }
        }
        console.log('Base User: ', baseUser);

        game.players.push(baseUser);
        await (API.graphql(graphqlOperation(updateGame, {input: {id: game.id, players: game.players}})));

        console.log("Successfully updated GraphQL!");

        dispatch(setGame(game));
                } else {
                  dispatch(setErrorSeverity("error"));
                  dispatch(showSnackbar("Game Full"));
                  return;  
                } 
            } else {
              dispatch(setErrorSeverity("error"));
              dispatch(showSnackbar("Game started already"));
              return;   
            }     
        } else {
            dispatch(setErrorSeverity("error"));
            dispatch(showSnackbar("Game ID does not exist"));
            return;
        }
    }
    
    function handleUpdate(e: any) {
        id.current = e.target.value;
        console.log(id.current);
    }

    function changeNickName(e: any) {
         setNickName(e.target.value);
    }

    return (
        <>
        { (!game.host)
        ?
        <>
        <div className="App">
            <header className="App-header">
                Welcome to the looounnnge...
                <br></br>
                <br></br>
                <br></br>
            </header>    

        </div>
        
        {/*Create Game contains create game button*/}
        <GameSettings />
        <br></br>
        {/* Input field for the join game ID */}
        <Input onKeyUp={handleUpdate} 
               placeholder = 'Game ID'/> {       }

        <Input onKeyUp={changeNickName}
               placeholder = 'Nickname' /> 

        {/* Button which joins existing game according to input id */}
        <Button onClick={fetchGame}>Join Game</Button>
        <Link to="/multiplayer">Go Back To Multiplayer</Link> 
        </>
        : <Redirect to="/multiplayer" /> }
        </>
    )
}

export default GameLounge
