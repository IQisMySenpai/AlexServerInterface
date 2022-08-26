class coolServer {
    node_server;
    node_power_on;
    node_online;
    node_status;
    node_user_count;
    node_users;

    _server_name;
    _power_on = 'Unknown';
    _online = 'Unknown';
    _status = 'Unknown';
    _user_count = 0;
    _users = {};

    constructor(server_name, label = null) {
        if (label === null) {
            label = server_name
        }
        this._server_name = server_name;
        this.node_server = $('<div class="server"><div class="server_name">' + label + '</div></div>');

        // Server Power
        let html = '<div class="server_item server_status"><div class="server_status_label">Power On:</div>';
        html += '<div class="server_status_value">Unknown</div></div>';
        html = $(html);
        this.node_power_on = html.find('div.server_status_value');
        this.node_server.append(html);

        // Server Online
        html = '<div class="server_item server_status"><div class="server_status_label">Server Online:</div>';
        html += '<div class="server_status_value">Unknown</div></div>';
        html = $(html);
        this.node_online = html.find('div.server_status_value');
        this.node_server.append(html);

        // Server Status
        html = '<div class="server_item server_status"><div class="server_status_label">Server State:</div>';
        html += '<div class="server_status_value">Unknown</div></div>';
        html = $(html);
        this.node_status = html.find('div.server_status_value');
        this.node_server.append(html);

        // Buttons
        html = '<div class="server_item server_buttons">';
        html += '<button class="server_button red_button">Reset State</button></div>';

        // User Inputs
        html += '<div class="server_item server_users"><div class="server_user_inputs">';
        html += '<input class="server_user_input" type="text" list="users" placeholder="User">';
        html += '<button class="server_button server_user_button green_button">+</button></div></div>';
        this.node_server.append($(html));

        html = '<div class="server_item server_status"><div class="server_status_label">Cur. Users:</div>';
        html += '<div class="server_status_value">Unknown</div></div>';
        html = $(html);
        this.node_user_count = html.find('div.server_status_value');
        this.node_server.append(html);

        this.node_users = $('<div class="users"></div>')
        this.node_server.append(this.node_users);

        $(this.node_server).find('button.green_button').on('click', {'server': this}, function(event){
            let server = event.data.server;
            let input = $(event.target).siblings('input');

            server.addUser(input.val());
            input.val('');
        });

        $(this.node_server).find('button.red_button').on('click', {'server': this}, function(event){
            let server = event.data.server;

            if (!confirm('Are you sure you want to reset state of ' + server._server_name)) {
                return server;
            }

            resetState(server);
        });

        this.refreshValues();

        window.setInterval(function (server) {
            server.refreshValues();
        }, 10000, this);

        $(document.body).append(this.node_server);
    }

    serverName() {
        return this._server_name;
    }

    powerOn(value = null) {
        if (value !== null) {
            this._power_on = value;
            this.node_power_on.html(value ? 'On' : 'Less On');
            return this;
        }
        return this._power_on;
    }

    isOnline(value = null) {
        if (value !== null) {
            this._online = value;
            this.node_online.html(value ? 'Online' : 'Offline');
            return this;
        }
        return this._online;
    }

    status(value = null) {
        if (value !== null) {
            this._status = value;
            this.node_status.html(value);
            return this;
        }
        return this._status;
    }

    userCount(value = null) {
        if (value !== null) {
            this._user_count = value;
            this.node_user_count.html(value);
            return this;
        }
        return this._user_count;
    }

    addUser(name) {
        name = name.trim();
        if (name === '') {
            alert('Name can\'t be empty.');
            return this;
        }
        if (this._users.hasOwnProperty(name)) {
            alert('This user is already using this server.');
            return this;
        } else {

            let user = $('<div class="user"><div class="username">' + name + '</div></div>');
            let button = $('<button class="server_button server_user_button red_button">-</button>');
            button.on('click', {'server': this}, function(event){
                let server = event.data.server;
                let username = $(event.target).siblings('div.username').html();

                server.removeUser(username);
            });
            user.append(button);
            this._users[name] = user;
            this.node_users.append(user);
            this.userCount(this.userCount() + 1);
            addUser(this, name);
            return this;
        }
    }

    silentAddUser(name) {
        name = name.trim();
        if (name === '') {
            alert('Name can\'t be empty.');
            return this;
        }
        if (this._users.hasOwnProperty(name)) {
            alert('This user is already using this server.');
            return this;
        } else {
            let user = $('<div class="user"><div class="username">' + name + '</div></div>');
            let button = $('<button class="server_button server_user_button red_button">-</button>');
            button.on('click', {'server': this}, function(event){
                let server = event.data.server;
                let username = $(event.target).siblings('div.username').html();
                server.removeUser(username);
            });
            user.append(button);
            this._users[name] = user;
            this.node_users.append(user);
            this.userCount(this.userCount() + 1);
            return this;
        }
    }

    removeUser(name) {
        if (this._users.hasOwnProperty(name)) {
            this._users[name].remove();
            delete this._users[name];
            this.userCount(this.userCount() - 1);
            removeUser(this, name);
            return this;
        } else {
            alert('This user does not exist.');
            return this;
        }
    }

    silentRemoveUser(name) {
        if (this._users.hasOwnProperty(name)) {
            this._users[name].remove();
            delete this._users[name];
            this.userCount(this.userCount() - 1);
            return this;
        } else {
            alert('This user does not exist.');
            return this;
        }
    }

    hasUser(name) {
        return this._users.hasOwnProperty(name);
    }

    allUsers() {
        return Object.keys(this._users);
    }

    refreshValues() {
        this.userCount(this.allUsers().length)
        getServerState(this);
        getServerOnline(this);
        getServerPowerOn(this);
        listUsers(this);
    }
}