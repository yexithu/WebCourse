var Backend = {

    socketAddress: 'https://wall.cgcgbcbc.com/',

    historyAddress: 'https://wall.cgcgbcbc.com/api/messages?num=3',

    socket: null,

    start: function () {
        this.socket = io.connect(this.socketAddress);
    },

    setConnectedHandler: function (handler) {
        this.socket.on('connect', handler);
    },

    setNewMessageHandler: function (handler) {
        this.socket.on('new message', handler);
    },

    setAdminHandler: function (handler) {
        this.socket.on('admin', handler);
    },

    setTestHandler: function (handler) {
        $('body').on('keydown', function (e) {
            if (e.keyCode == 13) {
                $.get(this.historyAddress, handler);
            }
        });
    },

    fetchHistory: function (handler) {
        $.get(this.historyAddress, handler);
    }
};