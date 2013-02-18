EMCC:=emcc
EMCC_OPTS:=-s LINKABLE=1
EMCONFIGURE:=emconfigure
EMMAKE:=emmake
LAME_URL:="http://downloads.sourceforge.net/project/lame/lame/3.99/lame-3.99.5.tar.gz"
TAR:=tar

LAME_VERSION:=3.99.5
LAME:=lame-$(LAME_VERSION)

all: libmp3lame.js dist/libmp3lame.min.js

libmp3lame.js: $(LAME) pre.js post.js
	$(EMCC) $(EMCC_OPTS) --pre-js pre.js --post-js post.js $(wildcard $(LAME)/libmp3lame/*.o) -o $@

dist/libmp3lame.min.js: libmp3lame.js
	closure-compiler $< --js_output_file $@

$(LAME): $(LAME).tar.gz
	$(TAR) xzvf $@.tar.gz && \
	cd $@ && \
	$(EMCONFIGURE) ./configure --disable-frontend && \
	$(EMMAKE) make

$(LAME).tar.gz:
	test -e "$@" || wget $(LAME_URL)

clean:
	$(RM) -rf $(LAME)

distclean: clean
	$(RM) $(LAME).tar.gz

.PHONY: clean distclean
