// libmp3lame function wrappers

var get_lame_version = Module.cwrap('get_lame_version', 'string');

var lame_init = Module.cwrap('lame_init', 'number');

var lame_init_params = Module.cwrap('lame_init_params', 'number', [ 'number' ]);

var lame_encode_buffer_ieee_float = function(handle, channel_l, channel_r) {
	var BUFSIZE = 8192;
	var outbuf = _malloc(BUFSIZE);
	var nread = Module.ccall('lame_encode_buffer_ieee_float', 'number', [ 'number', 'array', 'array', 'number', 'number', 'number' ], [ handle, channel_l, channel_r, channel_l.length, outbuf, BUFSIZE ]);
	var retdata = new Uint8Array(nread);
	retdata.set(HEAPU8.subarray(outbuf, outbuf + nread));
	_free(outbuf);
	return { size: nread, data: retdata };
};

var lame_encode_flush = Module.cwrap('lame_encode_flush', 'number', [ 'number', 'number', 'number' ]);

var lame_close = Module.cwrap('lame_close', 'number', [ 'number' ]);
