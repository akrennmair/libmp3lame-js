// libmp3lame function wrappers

var BUFSIZE = 8192;

return {
	STEREO: 0, 
	JOINT_STEREO: 1, 
	MONO: 3,

	get_version: Module.cwrap('get_lame_version', 'string'),

	init: Module.cwrap('lame_init', 'number'),
	init_params: Module.cwrap('lame_init_params', 'number', [ 'number' ]),

	set_mode: Module.cwrap('lame_set_mode', 'number', [ 'number', 'number' ]),
	get_mode: Module.cwrap('lame_get_mode', 'number', [ 'number' ]),

	set_num_samples: Module.cwrap('lame_set_num_samples', 'number', [ 'number', 'number' ]),
	get_num_samples: Module.cwrap('lame_get_num_samples', 'number', [ 'number' ]),

	set_num_channels: Module.cwrap('lame_set_num_channels', 'number', [ 'number', 'number' ]),
	get_num_channels: Module.cwrap('lame_get_num_channels', 'number', [ 'number' ]),

	set_in_samplerate: Module.cwrap('lame_set_in_samplerate', 'number', [ 'number', 'number' ]),
	get_in_samplerate: Module.cwrap('lame_get_in_samplerate', 'number', [ 'number' ]),

	set_out_samplerate: Module.cwrap('lame_set_out_samplerate', 'number', [ 'number', 'number' ]),
	get_out_samplerate: Module.cwrap('lame_get_out_samplerate', 'number', [ 'number' ]),

	set_bitrate: Module.cwrap('lame_set_brate', 'number', [ 'number', 'number' ]),
	get_bitrate: Module.cwrap('lame_get_brate', 'number', [ 'number' ]),
	
	set_VBR: Module.cwrap('lame_set_VBR', 'number', [ 'number', 'number' ]),
	get_VBR: Module.cwrap('lame_get_VBR', 'number', [ 'number' ]),
	
	set_VBR_q: Module.cwrap('lame_set_VBR_q', 'number', [ 'number', 'number' ]),
	get_VBR_q: Module.cwrap('lame_get_VBR_q', 'number', [ 'number' ]),
	
	set_VBR_mean_bitrate_kbps: Module.cwrap('lame_set_VBR_mean_bitrate_kbps', 'number', [ 'number', 'number' ]),
	get_VBR_mean_bitrate_kbps: Module.cwrap('lame_get_VBR_mean_bitrate_kbps', 'number', [ 'number' ]),
	
	set_VBR_min_bitrate_kbps: Module.cwrap('lame_set_VBR_min_bitrate_kbps', 'number', [ 'number', 'number' ]),
	get_VBR_min_bitrate_kbps: Module.cwrap('lame_get_VBR_min_bitrate_kbps', 'number', [ 'number' ]),
	
	set_VBR_max_bitrate_kbps: Module.cwrap('lame_set_VBR_max_bitrate_kbps', 'number', [ 'number', 'number' ]),
	get_VBR_max_bitrate_kbps: Module.cwrap('lame_get_VBR_max_bitrate_kbps', 'number', [ 'number' ]),

	encode_buffer_ieee_float: function(handle, channel_l, channel_r) {
		var outbuf = _malloc(BUFSIZE);
		var inbuf_l = _malloc(channel_l.length * 4);
		var inbuf_r = _malloc(channel_r.length * 4);
		for (var i=0;i<channel_l.length;i++) {
			setValue(inbuf_l + (i*4), channel_l[i], 'float');
		}
		for (var i=0;i<channel_r.length;i++) {
			setValue(inbuf_r + (i*4), channel_r[i], 'float');
		}
		var nread = Module.ccall('lame_encode_buffer_ieee_float', 'number', [ 'number', 'number', 'number', 'number', 'number', 'number' ], [ handle, inbuf_l, inbuf_r, channel_l.length, outbuf, BUFSIZE ]);
		var arraybuf = new ArrayBuffer(nread);
		var retdata = new Uint8Array(arraybuf);
		retdata.set(HEAPU8.subarray(outbuf, outbuf + nread));
		_free(outbuf);
		_free(inbuf_l);
		_free(inbuf_r);
		return { size: nread, data: retdata };
	},

	encode_flush: function(handle) {
		var outbuf = _malloc(BUFSIZE);
		var nread = Module.ccall('lame_encode_flush', 'number', [ 'number', 'number', 'number' ], [ handle, outbuf, BUFSIZE ]);
		var arraybuf = new ArrayBuffer(nread);
		var retdata = new Uint8Array(arraybuf);
		retdata.set(HEAPU8.subarray(outbuf, outbuf + nread));
		_free(outbuf);
		return { size: nread, data: retdata };
	},

	close: Module.cwrap('lame_close', 'number', [ 'number' ])
};

})();

self.Lame = Lame; // make Lame accessible to other webworker scripts.


