import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
@Component({
	selector: "security-chat",
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: "./chat.component.html",
	styleUrl: "./chat.component.css",
})
export class ChatComponent {
	public userName = "";
	public groupName = "";
	public messageToSend = "";
	public joined = false;
	public conversation: NewMessage[] = [
		{
			message: "Bienvenido",
			userName: "Sistema",
		},
	];
	private connection: HubConnection;
	constructor() {
		this.connection = new HubConnectionBuilder().withUrl("http://localhost:5149/hubs/chat").build();
		this.connection.on("NewUser", message => this.newUser(message));
		this.connection.on("NewMessage", message => this.newMessage(message));
		this.connection.on("LeftUser", message => this.leftUser(message));
	}
	ngOnInit(): void {
		this.connection
			.start()
			.then(_ => {
				console.log("Connection Started");
			})
			.catch(error => {
				return console.error(error);
			});
	}
	public join() {
		this.connection.invoke("JoinGroup", this.groupName, this.userName).then(_ => {
			this.joined = true;
		});
	}
	public sendMessage() {
		const newMessage: NewMessage = {
			message: this.messageToSend,
			userName: this.userName,
			groupName: this.groupName,
		};

		this.connection.invoke("SendMessage", newMessage).then(_ => (this.messageToSend = ""));
	}
	public leave() {
		this.connection.invoke("LeaveGroup", this.groupName, this.userName).then(_ => (this.joined = false));
	}
	private newUser(message: string) {
		console.log(message);
		this.conversation.push({
			userName: "Sistema",
			message: message,
		});
	}
	private newMessage(message: NewMessage) {
		console.log(message);
		this.conversation.push(message);
	}
	private leftUser(message: string) {
		console.log(message);
		this.conversation.push({
			userName: "Sistema",
			message: message,
		});
	}
}
interface NewMessage {
	userName: string;
	message: string;
	groupName?: string;
}