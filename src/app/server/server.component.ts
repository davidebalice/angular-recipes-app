import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrl: './server.component.css',
})
export class ServerComponent implements OnInit {
  serverId: number = 10;
  serverStatus: String = 'offline';
  allowNewServer: boolean = false;
  serverCreationStatus = 'No server was created';
  serverName = '';
  serverCreated = false;
  showSecret = false;
  servers = ['Test server 1', 'Test server 2'];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  getServerId() {
    return this.serverId;
  }

  getServerStatus() {
    return this.serverStatus;
  }

  changeServerStatus() {
    if (this.serverStatus == 'online') {
      this.serverStatus = 'offline';
    } else {
      this.serverStatus = 'online';
    }
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onCreateServer() {
    this.serverCreated = true;
    this.serverCreationStatus = 'Server was created!';
    this.servers.push(this.serverName);
  }

  onUpdateServerName(event: any) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  onResetServerName() {
    this.serverName = '';
  }

  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }

  onToggle() {
    this.showSecret = !this.showSecret;
  }
}
