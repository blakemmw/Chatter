import { Component } from "@angular/core";
import * as io from "socket.io-client";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  messageText: string;
  messages: Array<any> = [];
  socket: SocketIOClient.Socket;
  username = "";
  clientID = "";
  nickname = "";

  constructor() {
    this.socket = io.connect();
  }

  ngOnInit() {
    this.messages = new Array();
    this.listen2Events();
  }

  listen2Events() {
    this.socket.on("msg", data => {
      this.messages.push(data);
    });
    this.socket.on("getMyId", data => {
      this.clientID = data;
    });
  }
  
  sendMessage() {
  
    let sent = {
      msg: this.messageText,
      un: this.username,
      clientId: this.clientID
    }

    this.socket.emit("newMsg",
    sent);
    this.messageText = "";
  }

  resetUsername() {
    this.username = "";
  }

}