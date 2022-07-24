let nexGui = {
    endTime: new Date('2022-07-30 11:37:00'),
    dhm(t) {
        var cd = 24 * 60 * 60 * 1000,
            ch = 60 * 60 * 1000,
            d = Math.floor(t / cd),
            h = Math.floor( (t - d * cd) / ch),
            m = Math.round( (t - d * cd - h * ch) / 60000);
      if( m === 60 ){
        h++;
        m = 0;
      }
      if( h === 24 ){
        d++;
        h = 0;
      }
      return `${d} days ${h} hours ${m} minutes`;
      //return [d, pad(h), pad(m)].join(':');
    },
    startUp() {
        this.display.notice(`NexGui is currently down.`);
        this.display.notice(`Service will be restored in ${this.dhm(this.endTime - Date.now())}.`);
        this.display.notice(`Please contact Tlalaiad on Discord with any questions.`);
    },
    display: {
        versionNotice(args) { return args},
        notice(txt, html = false) {
            let msg = $('<span></span>', {
                class: "mono"
            });
            $('<span></span>', {
                style: 'color:DodgerBlue'
            }).text('[-').appendTo(msg);
            $('<span></span>', {
                style: 'color:OrangeRed'
            }).text('nexGui').appendTo(msg);
            $('<span></span>', {
                style: 'color:DodgerBlue'
            }).text('-] ').appendTo(msg);
        
            if (html) {
                txt.appendTo(msg)
            } else {
                $('<span></span>', {
                    style: 'color:GoldenRod'
                }).text(txt).appendTo(msg)
            }

            print(msg[0].outerHTML);
        }
    },
    onGMCP() { return; },
    aliases: {
        call() {nexGui.startUp()}
    }
}
