@extends('layouts.app')

@push('styles')
<style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font: 13px Helvetica, Arial; }
    form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
    form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
    form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
    #messages { list-style-type: none; margin: 0; padding: 0; }
    #messages li { padding: 5px 10px; }
    #messages li:nth-child(odd) { background: #eee; }
</style>
@endpush

@section('content')
    <ul id="messages"></ul>
    <form action="">
        <input id="m" autocomplete="off" /><button>Send</button>
    </form>
@endsection
@push('scripts')
<script src="http://socket.docker.dev:3000/socket.io/socket.io.js"></script>
<script src="https://code.jquery.com/jquery-1.11.1.js"></script>
<script>
$(function () {
    var socket = io('http://socket.docker.dev:3000/');
    var conversation = null;

    $('form').submit(function(){
        socket.emit('chat message', {
            message: $('#m').val(),
            conversation: conversation,
        });
        $('#m').val('');
        return false;
    });

    socket.on('chat message', function(data){
        $('#messages').append($('<li>').text(data.message));
    });

    socket.on('meta', msg => {
        if(msg.action === 'connected'){
            axios.post('/socket/auth', {socketId: msg.socketId}).then(response => {console.log(response)}).catch(error => {console.log(error)})
            return
        }
        if(msg.action === 'authenticated'){
            conversation = msg.conversation.id;
        }
        console.log(msg);
    })
});
</script>
@endpush