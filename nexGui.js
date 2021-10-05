'use strict'

var nexGui = {
    version: '0.2.9',
    classBalance: true,
    classBalanceType: 'Entity', // This is from GMCP.CharStats or GMCP.Char.Vitals
    colors: {
        highlightNames(txt) {
            let players = Object.keys(nexGui.cdb.players);
            for (let i = 0; i < players.length; i++) {
                let colour = nexGui.colors.city[nexGui.cdb.players[players[i]].city]; 
                txt = txt.replace(nexGui.cdb.players[players[i]].regex, `<span style="color:${colour}">${players[i]}</span>`);
            }
            return txt;
        },
        room: {},
        city: {
            "(hidden)": "gray",
            "(none)": "gray",
            ashtan: "#800080",
            cyrene: "#008080",
            eleusis: "#00ff00",
            hashan: "#808000",
            mhaldor: "#ff0000",
            targossas: "#ffffff"
        },
        attacks: {
            warp:'orange',
            incantation:'orange',
            gut:'orange',
            frostwave:'orange',
            dragonchill:'orange',
            ague:'orange',
            tailsmash:'orange',
            override:'orange',
            garrote:'orange',
            bleed:'orange',
            doubleslash:'orange',
            jab:'orange'
        },
        actions: {

        }
    },
    inject(rule) {
        if (!$('#client_nexgui-rules').length) {
            $('body').append('<div id="client_nexgui-rules"></div>')
        };

        $('#client_nexgui-rules').append('<style>' + rule + '</style></div>')
    },
    generateStyle() {
        $('#client_nexgui-rules').remove();
        //this.inject('.nexswitch {position: relative;display: inline-block;width: 38px;height: 21px;}');
        this.inject('.nexswitch {position: relative;display: inline-block;width: 26px;height: 16px;}');
        this.inject('.nexswitch input {opacity: 0;width: 0;height: 0;}');
        //this.inject('.nexslider {position: absolute;cursor: pointer;top: 0;left: 0;right: 0;bottom: 0;background-color: #555555;-webkit-transition: .4s;transition: .4s;border-radius: 24px;}');
        this.inject('.nexslider {position: absolute;cursor: pointer;top: 0;left: 0;right: 0;bottom: 0;background-color: #555555;-webkit-transition: .4s;transition: .4s;border-radius: 16px;}');       
        //this.inject('.nexslider:before {position: absolute;content: "";height: 15px;width: 15px;left: 3px;bottom: 3px;background-color: white;-webkit-transition: .4s;transition: .4s;border-radius: 50%;}');
        this.inject('.nexslider:before {position: absolute;content: "";height: 10px;width: 10px;left: 3px;bottom: 3px;background-color: white;-webkit-transition: .4s;transition: .4s;border-radius: 50%;}');
        this.inject('input:checked + .nexslider {background-color: #2196F3;}');
        this.inject('input:focus + .nexslider {box-shadow: 0 0 1px #2196F3;}');
        //this.inject('input:checked + .nexslider:before {-webkit-transform: translateX(16px);-ms-transform: translateX(16px);transform: translateX(16px);}');
        this.inject('input:checked + .nexslider:before {-webkit-transform: translateX(10.7px);-ms-transform: translateX(10.7px);transform: translateX(10.7px);}');
        this.inject('.nexcontainer { display: flex; }');
        this.inject('.nexfixed { width: 200px; }');
        this.inject('.nexflex-item { flex-grow: 1; }');
        if (client.css_style != 'standard')
            this.inject('#tab_nexmap_map::before {content: "\\f2ae";}');
        
        this.inject('.class-balance::before {content:"\\f254" !important}');
        this.inject('#channel_all .line {margin-bottom:5px !important}');
        this.inject('#test_stream .line {margin-bottom:1px !important}');
        this.inject('.ui-tabs-tab {opacity:0%}');
        this.inject('.ui-state-hover {opacity:100%}');

        // Room target CSS
        this.inject('.nexGui_room-target   { outline: 1px solid red; }');

        // Nexus override CSS
        this.inject('#user_input {width:100%;border-radius:0px;margin:0 0 0 0}');
        this.inject('#data_form {height:100%}');
        this.inject('#input {bottom:2px;width:100%}');
        this.inject('.ui-tabs > .tab_content {border-radius:0;top:-0.5px;height:calc(100% - 11px)}');
        this.inject('.tab_container {height:100%}');
        this.inject('#tab_content_main_output {height:calc(100% - 8px);padding: 6px 6px 6px 6px}');
        this.inject('.tab_nav {position:absolute;bottom: 5px;right: 0}');
        this.inject('.ui-tabs {padding:0}');
        this.inject('#channel_all div {margin-bottom:5px}');
        this.inject('body {line-height:18px}');

        // Mouse over API display


        /*
        $('#user_input').css({
            'width':'100%',
            'border-radius':'0px',
            'margin':'0 0 0 0'
        });
        $('#data_form').css('height', '100%')
        $('#input').css({
            'bottom':'2px',
            'width':'100%'
        });
        $('.ui-tabs > .tab_content').css({
            'border-radius':0,
            'top':'-0.5px',
            'height': 'calc(100% - 11px)'
        });
        $('.tab_container').css('height', '100%');
        $('#tab_content_main_output').css({
            'height':'calc(100% - 8px)',
            'padding': '6px 6px 6px 6px'
        });

        $('.tab_nav').css({
            position: 'absolute',
            bottom: '5px',
            right: '0'
        });

        $('.ui-tabs').css({padding:0});
        $('#channel_all div').css('margin-bottom', '5px');
        $('body').css('line-height', '18px');*/
        
    },
    addOption(container, title, option, handler) {
        handler = (e)=>{
            nexSys.eventStream.raiseEvent(`nexGui-option-${title.replaceAll(' ','')}`, e.target.checked);
        }
        let optionRow = $('<tr></tr>', {id:`nexGui-option-${title.replaceAll(' ','')}`});
        $('<td></td>', {style: `padding:0px 5px 0px 0px;display:block;font-weight:bold`}).text(title).appendTo(optionRow);

        let lab = $('<label></label>', {
            'class': 'nexswitch nexInput'
        });
        $('<input></input>', {
            type: "checkbox",
            'class': 'nexbox nexInput'
        })
            .prop('checked', option)
        	.on('change', handler)
            /*.on('change', function () {
            option = $(this).prop('checked');
            console.log(option)
            console.log($(this).prop('checked'))
        	})*/
            .appendTo(lab);
        $('<span></span>', {
            'class': 'nexslider nexInput'
        }).appendTo(lab);
        $('<td></td>').append(lab).appendTo(optionRow);
        optionRow.appendTo(container);
    },
    layout() {
    	/***********************************************************************
            Helper functions
         ***********************************************************************/
        let makeBox = function(name, type, weight, parent) {
            let el = find_client_layout_element(`box_${parent}`);

            let box = {
                type: type,
                weight: weight,
                mobile_weight: 0,
                id: "box_"+name,
                elements: []
            }

            $(`<div id="box_${name}" data-display-element-id="box_${name}" class="element" style="height: ${weight*10}%; float: left; display: block;">`).appendTo(`#box_${parent}`)

            el.elements.push(box);

            return box;
        }

        let makeContainer = function(containers, box, new_weight = 0) {
            let el = find_client_layout_element(`box_${box}`);
            for(let e of containers) {
                $(`<div id="container_${e}" data-display-element-id="container_${e}" class="tabs bordered element" style="width: 100%; height: 5%;">`).appendTo(`#box_${box}`);
                client.display_tabs[`container_${e}`] = [];
                client.default_display_tabs[`container_${e}`] = [];

                el.elements.push({
                        type: "tabs",
                        weight: new_weight > 0 ? new_weight : 1/(el.elements.length+containers.length),
                        id: `container_${e}`,
                        name: `New container_${e} Tabs`,
                    });
            }
        }

        let makeTab = function(tab, options) {
            tab = Object.create(Tab);
            tab.init(options[0],options[1],options[2],'profile',options[4]);
            tab.activate();
            return tab;
        }
        /***********************************************************************
            Remove the tabs that will not be used in the new layout
         ***********************************************************************/
        activate_tab('skills', false);
        activate_tab('inventory', false);
        activate_tab('room', false);
        activate_tab('quests', false);
        activate_tab('tasks', false);
        activate_tab('affdef', false);
        /***********************************************************************
            Adds 4 Horizontal rows to box_2.
         ***********************************************************************/
        let box_2h1 = makeBox('2h1', 'hbox', 0.45, '2');
        let box_2h2 = makeBox('2h2', 'hbox', 0.05, '2');
        let box_2h3 = makeBox('2h3', 'hbox', 0.25, '2');
        let box_2h4 = makeBox('2h4', 'hbox', 0.25, '2');

        //Adds a 2 stack box to the left of the Map window
        let box_2h1v1 = makeBox('2h1v1', 'vbox', 0.333, '2h1');
        let box_2h1v2 = makeBox('2h1v2', 'vbox', 0.666, '2h1');

        // Moves the default map tap into our new container.
        box_2h1v2.elements = [JSON.parse(JSON.stringify(find_client_layout_element('box_2').elements[0]))];
        $('#container_1').appendTo('#box_2h1v2').css('height', '100%');

        box_2h1.elements = [box_2h1v1, box_2h1v2]
        find_client_layout_element('box_2').elements = [box_2h1, box_2h2, box_2h3, box_2h4];

        /***********************************************************************
            Adds tabs to the 2 stack left of the map window
         ***********************************************************************/
        makeContainer(['2h1v1a', '2h1v1b'], '2h1v1');
        var tab_2h1v1a = makeTab(tab_2h1v1a, ["2h1v1a", "2h1v1a", "2h1v1a", '', 'container_2h1v1a']);
        var tab_2h1v1b = makeTab(tab_2h1v1b, ["2h1v1b", "2h1v1b", "2h1v1b", '', 'container_2h1v1b']);
        find_client_layout_element('box_2h1v1').elements.forEach(e=>e.weight=0.5)

        /***********************************************************************
            Single long narrow pane
         ***********************************************************************/
        makeContainer(['2h2a'], '2h2');
        var tab_2h2a = makeTab(tab_2h2a, ["2h2a", "2h2a", "2h2a", '', 'container_2h2a']);
        $('#tbl_2h2a').css('display', 'flex');

        /***********************************************************************
            Creates the 3x2 grid of panes at the bottom of box_2
         ***********************************************************************/
        makeContainer(['2h3a', '2h3b', '2h3c'], '2h3');
        makeContainer(['2h4a', '2h4b', '2h4c'], '2h4');

        var tab_2h3a = makeTab(tab_2h3a, ["2h3a", "2h3a", "2h3a", '', 'container_2h3a']);
        var tab_2h3b = makeTab(tab_2h3b, ["2h3b", "2h3b", "2h3b", '', 'container_2h3b']);
        var tab_2h3c = makeTab(tab_2h3c, ["2h3c", "2h3c", "2h3c", '', 'container_2h3c']);

        var tab_2h4a = makeTab(tab_2h4a, ["2h4a", "2h4a", "2h4a", '', 'container_2h4a']);
        var tab_2h4b = makeTab(tab_2h4b, ["2h4b", "2h4b", "2h4b", '', 'container_2h4b']);
        var tab_2h4c = makeTab(tab_2h4c, ["2h4c", "2h4c", "2h4c", '', 'container_2h4c']);

        find_client_layout_element('box_2h3').elements.forEach(e=>e.weight=0.333)
        find_client_layout_element('box_2h4').elements.forEach(e=>e.weight=0.333)
        /***********************************************************************
            Creates the 4 stacked panels on the left side of the main screen.
            Box_5 with containers 5a, 5b, 5c. 5d
         ***********************************************************************/
        $('#box_5').remove();
        makeBox('5', 'vbox', 0.1, '1')
        makeContainer(['5a', '5b', '5c', '5d'], '5');

        //.init (name, title, mouseover, icon, container)
        var tab_5a = makeTab(tab_5a, ["5a", "5a", "5a", '', 'container_5a']);
        var tab_5b = makeTab(tab_5b, ["5b", "5b", "5b", '', 'container_5b']);
        var tab_5c = makeTab(tab_5c, ["5c", "5c", "5c", '', 'container_5c']);
        var tab_5d = makeTab(tab_5d, ["5d", "5d", "5d", '', 'container_5d']);
        find_client_layout_element('box_5').elements.forEach(e=>e.weight=0.25)
        $('#box_5').insertBefore('#box_3')

        /***********************************************************************
            Adds the chat window to the top of the main panel
         ***********************************************************************/
        makeContainer(['3a'], '3', 0.3)
        move_tab_to_existing_container("all_comm", "container_3a")
        $('#container_3a').insertBefore('#main_container')
        /***********************************************************************
            Footer bar changes
         ***********************************************************************/
        $('#vote, #help, #footer > .separator').hide();
        $('#status-level, #status-gold, #status-bank').hide();
        $('#status-ping').prependTo('#character_module_status');
        $('#status-ping').css('width', '8%');
        $('#status-target').css('width', '75%');
        $('#character_module_status').css('width', '25%');
        $('#character_module_balances').remove()
        $('#gauges').remove();
        let res ='';
        res += '<div id="gauges" class="reduced">';
                for (var i = 0; i < client.gauge_names.length; i++) {
                    var gg = client.gauge_names[i];
                    res += '<div id="character_module_gauge_'+gg+'" class="gauge'+((i == client.gauge_names.length-1)?' last':'')+'"><div class="diff"></div>';
                    res += '<div class="text" rel="tooltip">'+client.ucfirst(gg)+'</div></div>';
                }
               res += '</div>';
        let el = $(res);
        el.insertAfter('#character_module_status')
        $('#gauges').css({
            'width': '38%',
            'padding': '2px 0 0 0'
        });
        $('<div></div>', {id:'character_module_balances', class: 'reduced', style: 'padding: 0 5px 0 0'})
        .append($('<div></div>', {id:'character_module_balance', class: 'balance bal'}))
        .append($('<div></div>', {id:'character_module_equilibrium', class: 'balance eq'}))
        .append($('<div></div>', {id:'character_module_class', class: 'balance class-balance'}))
        .insertBefore('#gauges');

        /***********************************************************************
            Stuff
         ***********************************************************************/
        display_tabs.disabled_central = ['bottom_buttons', 'avatar', 'gauges'];
        display_tabs.container_2 = [];
        display_tabs.container_3 = [];
        display_tabs.container_4 = [];
        $('#character_module_avatar').remove();
        $('#bottom_buttons').remove();
        $('#box_2').insertAfter('#box_3');
        find_client_layout_element('box_5').weight=0.08;
        find_client_layout_element('box_3').weight=0.47;
        find_client_layout_element('box_2').weight=0.45;  
        /***********************************************************************
            Run update to fit all windows to new sizes
         ***********************************************************************/
        client.redraw_interface();

        nexGui.room.layout();
        nexGui.stats.layout();
        nexGui.party.layout();
        nexGui.pvp.layout();
        nexGui.timer.layout();
        nexGui.def.layout();
        nexGui.feed.layout();
        nexGui.generateStyle();
    },
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
    
        client.print(msg[0].outerHTML);
    },
    startUp() {
        // Custom print function allowing easy printing of HTML and printing inline with text blocks.
        client.nexPrint = function(s, selector = '#output_main')
        {   
            if (client.current_block) {
                let inline = {
                    line: s,
                    type: 'html'
                }
                let idx = client.current_block.length;
                if (client.current_line) idx = client.current_block.indexOf(client.current_line) + 1;
                client.current_block.splice(idx, 0, inline);
            } else {
                let timestamp;
                if (client.show_timestamp_milliseconds === true)
                    timestamp = client.getTimeMS();
                else
                    timestamp = client.getTimeNoMS();
                let cl = "timestamp mono no_out";
                timestamp = "<span class=\"" + cl + "\">" + timestamp + "&nbsp;</span>";
                ow_Write(selector, timestamp+s);
            }
        }
        //nexSys.eventStream.removeListener('Comm.Channel.Players', 'channelPlayersMongo');

        this.restoreEvents();
        this.layout();
        client.send_direct('pwho');
        client.send_direct('enemies');
        client.send_direct('allies');
        client.send_direct('def');
        client.send_direct('ql');
        this.notice(`GUI version ${this.version} loaded and ready for use.`);
    },
    restoreEvents() {
        nexSys.eventStream.removeListener('Char.Items.List', 'nexGuiRoomAddAll');
        nexSys.eventStream.removeListener('Char.Items.Add', 'nexGuiRoomAdd');
        nexSys.eventStream.removeListener('Char.Items.Remove', 'nexGuiRoomRemove');
        nexSys.eventStream.removeListener('Room.Players', 'nexGuiRoomPlayers');
        nexSys.eventStream.removeListener('Room.AddPlayer', 'nexGuiAddPlayer');
        nexSys.eventStream.removeListener('Room.RemovePlayer', 'nexGuiRemovePlayer');
        nexSys.eventStream.removeListener('Char.Defences.Remove', 'nexGuiDefenceAdd');
        nexSys.eventStream.removeListener('Char.Defences.Add', 'nexGuiDefenceRemove');
        nexSys.eventStream.removeListener('Char.Defences.List', 'nexGuiDefences');
        nexSys.eventStream.removeListener('IRE.Target.Info', 'nexGuiTargetInfo');
        nexSys.eventStream.removeListener('Char.Status', 'nexGuiCharStatus');       
        nexSys.eventStream.removeListener('IRE.Misc.Achievement', 'nexGuiMiscAchievement');
        nexSys.eventStream.removeListener('Comm.Channel.Players', 'channelPlayersMongo');
        nexSys.eventStream.removeListener('Char.Vitals', 'nexGuiClassBalance');

        // Populate nexGUI GMCP events
        let nexGuiRoomAddAll = function(args) {
            nexGui.room.addAll(args.items);
        }
        nexSys.eventStream.registerEvent('Char.Items.List', nexGuiRoomAddAll);

        let nexGuiRoomAdd = function(args) {
            if (args.location == "room")
                nexGui.room.add(args.item);
        }
        nexSys.eventStream.registerEvent('Char.Items.Add', nexGuiRoomAdd);

        let nexGuiRoomRemove = function(args) {
            if (args.location == "room")
                nexGui.room.remove(args.item);
        }
        nexSys.eventStream.registerEvent('Char.Items.Remove', nexGuiRoomRemove);

        let nexGuiRoomPlayers = function(args) {
            nexGui.room.addPlayers(args);
            $('.nexGui_room-player').hover((e)=>{nexGui.room.players.dialog(e.target.attributes.player.value)}, ()=>{$('#nexGui-dialog').dialog('destroy')})
        }
        nexSys.eventStream.registerEvent('Room.Players', nexGuiRoomPlayers);

        let nexGuiAddPlayer = function(args) {
            nexGui.room.players.add(args.name);
            $('.nexGui_room-player').hover((e)=>{nexGui.room.players.dialog(e.target.attributes.player.value)}, ()=>{$('#nexGui-dialog').dialog('destroy')})
        }
        nexSys.eventStream.registerEvent('Room.AddPlayer', nexGuiAddPlayer);

        let nexGuiRemovePlayer = function(args) {
            nexGui.room.players.remove(args);
            $('.nexGui_room-player').hover((e)=>{nexGui.room.players.dialog(e.target.attributes.player.value)}, ()=>{$('#nexGui-dialog').dialog('destroy')})
        }
        nexSys.eventStream.registerEvent('Room.RemovePlayer', nexGuiRemovePlayer);

        let nexGuiDefenceAdd = function(args) {
            nexGui.def.add(args[0]);
        }
        nexSys.eventStream.registerEvent('Char.Defences.Remove', nexGuiDefenceAdd);

        let nexGuiDefenceRemove = function(args) {
            nexGui.def.remove(args.name);
        }
        nexSys.eventStream.registerEvent('Char.Defences.Add', nexGuiDefenceRemove);

        let nexGuiDefences = function(args) {
            nexGui.def.update(args);
        }
        nexSys.eventStream.registerEvent('Char.Defences.List', nexGuiDefences);

        let nexGuiTargetInfo = function(args) {
            GMCP.TargetHP_Change = parseInt(GMCP.TargetHP_Old.slice(0,GMCP.TargetHP_Old.length-1,1))-parseInt(GMCP.TargetHP.slice(0,GMCP.TargetHP.length-1,1));
            GMCP.TargetHP_Old = args.hpperc;
        }
        nexSys.eventStream.registerEvent('IRE.Target.Info', nexGuiTargetInfo);

        let nexGuiCharStatus = function(args) {
            nexGui.stats.update();
        }  
        nexSys.eventStream.registerEvent('Char.Status', nexGuiCharStatus);

        let nexGuiMiscAchievement = function(args) {
            if (args?.name == 'TotalCreaturesKilled') {
                nexGui.stats.sessionCount++;
                nexGui.stats.instanceCount++;
            }
            nexGui.stats.update();
        }       
        nexSys.eventStream.registerEvent('IRE.Misc.Achievement', nexGuiMiscAchievement);
                
        let channelPlayersMongo = function(args) {
            nexGui.cdb.gmcpChannelPlayers(args);
        }
        nexSys.eventStream.registerEvent('Comm.Channel.Players', channelPlayersMongo);

        let nexGuiClassBalance = function(args) {
            nexGui.classBalanceUpdate(args);
        }
        nexSys.eventStream.registerEvent('Char.Vitals', nexGuiClassBalance);
    },   
    resize(left, middle) {
        left = left < 1 ? left : left/100;
        middle = middle < 1 ? middle : middle/100;
        find_client_layout_element('box_5').weight=left;
        find_client_layout_element('box_3').weight=middle;
        find_client_layout_element('box_2').weight=(1-(left+middle));
        client.redraw_interface();
    },
    classBalanceUpdate(args) {
        if (typeof args.charstats === 'undefined') {return;}
        if (args.charstats.indexOf(`${nexGui.classBalanceType}: Yes`) != -1) {
            $('#character_module_class').css('opacity', '100%')
            return
        }
        if (args.charstats.indexOf(`${nexGui.classBalanceType}: No`) != -1) {
            $('#character_module_class').css('opacity', '15%')
            return
        }
    },

    room: {
        displayID: true,
        enemies: [],
        allies: [],
        colors: {},
        highlightNames(txt) {
            let names = Object.keys(nexGui.cdb.players);
            for(let i = 0; i < names.length; i++) {
                if (txt.indexOf(names[i]) != -1) {
                    let name = nexGui.cdb.players[names[i]];
                    txt = txt.replace(name.regex, `<span style="color:${nexGui.colors.city[name.city]}">${names[i]}</span>`)
                }
            }
            return txt;
        },
        addAll(items) {
            $('#room_npc_table > tr').remove();
            $('#room_item_table > tr').remove();
            nexGui.room.npcs.guardCount = 0;
            items.forEach(e => this.add(e));
        },
        addPlayers(players) {
            $('#room_player_table > tr').remove();
            $('#tbl_2h2a').empty()
            players.forEach(e => this.players.add(e.name));
        },
        add(item) {   
            if (item?.attrib == "m" || item?.attrib == "mx") {
                this.npcs.add(item);
            } else {
                this.items.add(item);
            }
        },
        remove(item) {      
            if (item?.attrib == "m" || item?.attrib == "mx")
                this.npcs.remove(item);
            else
                this.items.remove(item);
        },
        layout() {
            $('#room_npc_table').remove();
            $('#room_item_table').remove();
            if ($('#room_npc_table').length < 1) {
                $("<table></table>", {
                    id: "room_npc_table",
                }).css({
                    'font-size':nexGui.room.npcs.size,
                    'text-align':'left',
                    //'table-layout':'fixed',
                    'max-width':'100%',
                    'border-spacing':'0px',
                    'padding': '1px'
                }).appendTo(nexGui.room.npcs.location);
                $('<th></th>', {style:"width:auto"}).appendTo('#room_npc_table');
                $('<th></th>', {style: "width:auto"}).appendTo('#room_npc_table');
            };
            if ($('#room_item_table').length < 1) {
                $("<table></table>", {
                    id: "room_item_table",
                }).css({
                    'font-size':nexGui.room.items.size,
                    'text-align':'left',
                    //'table-layout':'fixed',
                    'max-width':'100%',
                    'border-spacing':'0px',
                    'padding': '1px'
                }).appendTo(nexGui.room.items.location);
                $('<th></th>', {style:"width:auto"}).appendTo('#room_item_table');
                $('<th></th>', {style:"width:auto"}).appendTo('#room_item_table');
            };
            $(this.npcs.location, this.items.location).css({
                overflow:'auto',
                height:'100%'
            });
            $(this.items.location).css({
                overflow:'auto',
                height:'100%'
            });
            $(this.players.location).css({
                display:'flex',
                'flex-wrap':'wrap'
            });
        }, 
        npcs: {
            font: 'veranda',
            size: '11px',
            idColor: 'cyan',
            nameColor: 'white',
            location: '#tbl_2h1v1b',
            guardCount: 0,
            add(npc) {
                if (npc.icon == 'guard' && npc.attrib == 'mx') {
                    this.addGuard(npc);
                    return;
                }
                let entry = $('<tr></tr>', {id: `npc-${npc.id}`}).css({'font-size':this.size});
                $('<td></td>', {style:`padding: 0px 5px 0px 2px;color:${this.idColor}`}).text(nexGui.room.displayID?npc.id:"").appendTo(entry);
                $('<td></td>', {style:`color:${this.nameColor};padding:0px`}).text(npc.name).appendTo(entry);
                entry.on('click', (e) => {
                    send_direct(`settarget ${npc.id}`);
                    $(e.currentTarget).appendTo('#room_npc_table');
                })
                entry.appendTo('#room_npc_table');
            },
            remove(npc) {
                $(`#npc-${npc.id}`).remove();
            },
            target(id) {
                sdfg
            },
            addGuard(npc) {
                if (this.guardCount == 0) {
                    this.guardCount = 1;
                    let entry = $('<tr></tr>', {id: `npc-guards`});
                    $('<td></td>', {id: 'npc-guardCount', style:`padding: 0px;color:${this.idColor}`}).text(nexGui.room.displayID?`(${this.guardCount}x)`:"").appendTo(entry);
                    $('<td></td>', {style:`color:${this.nameColor};padding:0px`}).text('City Guards').appendTo(entry);
                    /*entry.on('click', (e) => {
                        send_direct(`settarget ${npc.id}`);
                        $(e.currentTarget).appendTo('#room_npc_table');
                    })*/
                    entry.appendTo('#room_npc_table');
                } else {
                    this.guardCount++
                    $('#npc-guardCount').text(`(${this.guardCount}x)`)
                }
                
            }  
        },
        items: {
            font: 'veranda',
            size: '11px',
            idColor: 'cyan',
            nameColor: 'white',
            location: '#tbl_2h1v1a',
            add(item) {
                let entry = $('<tr></tr>', {id: `item-${item.id}`}).css({'font-size':this.size});;
                $('<td></td>', {style:`color:${this.idColor}`}).text(nexGui.room.displayID?item.id:"").appendTo(entry);
                $('<td></td>', {style:`color:${nexGui.colors.room[item.id]||nexGui.colors.room[item.name]||this.nameColor}`}).text(item.name).appendTo(entry);
                entry.appendTo('#room_item_table');
            },
            remove(item) {
                $(`#item-${item.id}`).remove();
            }
        },
        players: {
            font: 'veranda',
            size: '13px',
            idColor: 'cyan',
            nameColor: 'white',
            location: '#tbl_2h2a',
            add(player) {
                if($(`player-${player}`).length > 0) {
                    $(`player-${player}`).remove();
                }
                let entry = $('<div></div>', {id: `player-${player}`, class:`${GMCP.Target == player ? 'nexGui_room-target' : ''}`})
                    .css({
                        color: `${nexGui.colors.city[nexGui.cdb.players[player].city]||this.nameColor}`,
                        margin: '0px 10px 0px 0px',
                        'font-size': this.size
                    })
                $('<span></span>', {class:'nexGui_room-player', player:player}).text(player).appendTo(entry);
                
                if (nexGui.room.enemies.indexOf(player) != -1) {
                    $('<span></span>', {style:'color:red'}).text('(').prependTo(entry);
                    $('<span></span>', {style:'color:red'}).text(')').appendTo(entry);
                } else if (nexGui.room.allies.indexOf(player) != -1) {
                    $('<span></span>', {style:'color:white'}).text('(').prependTo(entry);
                    $('<span></span>', {style:'color:white'}).text(')').appendTo(entry);
                }
                entry.appendTo(this.location)
            },
            remove(player) {
                $(`#player-${player}`).remove();
            },
            dialog(player) {
                let c = nexGui.cdb.players[player];
                let d = $('<div id="nexGui-dialog"></div>')
                let t = $('<table></table>').appendTo(d);
                let k = Object.keys(c);
                for (let i = 0; i < k.length; i++) {
                    if (k[i] == 'time') {break;}
                    let r = $('<tr></tr>');
                    $('<td></td>').text(`${k[i].toProperCase()}: `).appendTo(r);
                    $('<td></td>').text(`${c[k[i]]}`).appendTo(r);
                    r.appendTo(t)
                }
            
                d.dialog({
                    title: player,
                    position: {my: "right-10 center", at: "left center", of: nexGui.room.players.location}
                });
            }
        }         
    },

    party: {
        location: '#tbl_2h4c',
        font_size: '11px',
        party: [GMCP.Status.name],
        leader: GMCP.Status.name,
        targetCalls: true,
        affCalls: true,
        callTargets: false,
        callAffs: false,
        goldCollection: true,
        gagChat: true,
        
        removeMember(name) {
            console.log(" remove");
            $(`#party_list-${name}`).remove();
            nexGui.party.party.splice(nexGui.party.party.indexOf(name),1);
            $(`#leaderSelectList > option[value=${name}]`).remove();
        },
        
        addMember(name) {
            if (nexGui.party.party.indexOf(name) == -1) {
                nexGui.party.party.push(name);
            }
            
            $('<div></div>', {id: `party_list-${name}`})
                .append($("<span></span>").text(name).click(function() {removeMember(this);}))
                .appendTo($("#partyMemberList"));
            
            $("<option></option>", {value: name}).text(name).appendTo($("#leaderSelectList"));
        },
        
        updateMembers() {
            $('#partyMemberList').empty();
            $('#leaderSelectList').empty();
            this.party.forEach(e => this.addMember(e));
        },
        
        layout() {    	
            $('#partyDisplay').remove();
            let partyDisplay = $('<div></div>', {id: 'partyDisplay'})
                .css({
                    display:'flex',
                    'font-size': this.font_size,
                    'justify-content':'space-between'
                })
                .appendTo(this.location);
            let partyLeft = $('<div></div>', {id: 'partyLeft'}).appendTo(partyDisplay);
            let partyRight = $('<div></div>', {id: 'partyRight'}).appendTo(partyDisplay);

            let leaderSelect = $("<div></div>", {id: "leaderSelector", style: "margin: 0 0 10px 0"});
            $("<p>Party Leader:  </p>", {}).appendTo(leaderSelect);
            let leaderSelectList = $("<select></select>", {name: "leaderSelect", id: "leaderSelectList"})
            .css({'font-size':this.font_size})
            .change(function() {
                console.log($(this).val());
                nexGui.party.leader = $(this).val();
            })
            .appendTo(leaderSelect);
            for (let i=0; i < nexGui.party.party.length; i++) {
                $("<option></option>", {value: nexGui.party.party[i]}).text(nexGui.party.party[i]).appendTo(leaderSelectList);
            }

            let removeMember = function(args) {
                nexGui.party.removeMember(args)
            }
            
            let addMember = function(name) {
                nexGui.party.addMember(name);
            }
            
            let partyMemberInput = $("<input></input>", {
                type: "text",
                style: `width:10ch;height:${this.font_size}`,
                id: "partyMemberInput",
                name: "partyMemberInput",})
                .keyup(function(event) {
                    if (event.which === 13) {
                        event.preventDefault();
                        addMember($(this).val());
                        $(this).val("");
                    }   
            })
        
            // Populate the LEFT side column of the pane
            $('#partyLeft').empty();
            $('<div></div>')
                .append($("<span></span>", {style: "text-decoration:underline;font-weight:bold"}).text("Party Members"))
                .appendTo('#partyLeft');
            $('<div></div>', {id: 'partyMemberList'}).appendTo('#partyLeft');
            partyMemberInput.appendTo('#partyLeft');
            
            
            /////////////////////////////////////////////////////////////////////////////////////////
            // Populate the RIGHT side column of the pane
            $('#partyRight').empty();
            leaderSelect.appendTo('#partyRight');
            let partyOptionsTable = $('<table></table>', {id: 'partyOptionsTable'}).appendTo('#partyRight');
            
            nexGui.addOption(partyOptionsTable, 'Collect Gold', nexGui.party.goldCollection, (e)=>{nexGui.party.goldCollection = e.target.checked});
            nexGui.addOption(partyOptionsTable, 'Accept Targets', nexGui.party.targetCalls, (e)=>{nexGui.party.targetCalls = e.target.checked});
            nexGui.addOption(partyOptionsTable, 'Accept Affs', nexGui.party.affCalls, (e)=>{nexGui.party.affCalls = e.target.checked});
            nexGui.addOption(partyOptionsTable, 'Call Targets', nexGui.party.callTargets, (e)=>{nexGui.party.callTargets = e.target.checked});
            nexGui.addOption(partyOptionsTable, 'Call Affs', nexGui.party.callAffs, (e)=>{nexGui.party.callAffs = e.target.checked});
            nexGui.addOption(partyOptionsTable, 'Gag Chat', nexGui.party.gagChat, (e)=>{nexGui.party.gagChat = e.target.checked});
        }
    },

    stats: {
        location: '#tbl_2h4a',
        instanceCount: 0,
        sessionCount: 0,
        instanceGold: GMCP.Status.gold || 0,
        sessionGold: GMCP.Status.gold || 0,
        instanceTime: performance.now(),
        sessionTime: performance.now(),
        instanceXP: parseInt(GMCP.Status.xp.replace('%','')) || 0, 
        sessionXP: parseInt(GMCP.Status.xp.replace('%','')) || 0,
        sessionDeaths: 0,
        critCount: 0,
        font_size: '11px',
        
        instanceEntries: [
            {
                id: 'instanceKills',
                name: 'Total Kills', 
                value: () => {return  nexGui.stats.instanceCount}
            },
            {
                id: 'instanceGold',
                name: 'Total Gold', 
                value: () => {return (GMCP.Status.gold - nexGui.stats.instanceGold).toLocaleString()}
            },
            {
                id: 'instanceTime',
                name: 'Time', 
                value: () => {
                    let t = (performance.now() - nexGui.stats.instanceTime) / 1000;
                    let m = parseInt(t / 60);
                    let s = parseInt(t % 60);
                    return `${m > 1 ? m+"m" : ''} ${s}s`
                }
            },
            {
                id: 'instanceGoldPerHr',
                name: 'Gold/Hr', 
                value: () => {
                    let t = (performance.now() - nexGui.stats.instanceTime) / 1000;
                    let h = (t / 3600);
                    let gh = (GMCP.Status.gold - nexGui.stats.instanceGold) / h;
                    return parseInt(gh).toLocaleString()
                }
            },
        ],
        sessionEntries: [
            {
                id: 'sessionKills',
                name: 'Total Kills', 
                value: () => {return  nexGui.stats.sessionCount}
            },
            {
                id: 'sessionGold',
                name: 'Total Gold', 
                value: () => {return (GMCP.Status.gold - nexGui.stats.sessionGold).toLocaleString()}
            },
            {
                id: 'sessionTime',
                name: 'Time', 
                value: () => {
                    let t = (performance.now() - nexGui.stats.sessionTime) / 1000;
                    let h = parseInt(t / 3600);                
                    let m = parseInt((t % 3600) / 60);
                    let s = parseInt(t % 60);
                    return `${h >= 1 ? h+"h " : ''}${m >= 1 ? m+"m " : ''}${s}s`;
                }
            },
            {
                id: 'sessionGoldPerHr',
                name: 'Gold/Hr', 
                value: () => {
                    let t = (performance.now() - nexGui.stats.sessionTime) / 1000;
                    let h = (t / 3600);
                    let gh = (GMCP.Status.gold - nexGui.stats.sessionGold) / h;
                    return parseInt(gh).toLocaleString()
                }
            },
            {
                id: 'sessionXP',
                name: 'Total XP', 
                value: () => {
                    return `${parseInt(GMCP.Status.xp.replace('%','')) - nexGui.stats.sessionXP}%`;
                }
            },
            {
                id: 'sessionDeaths',
                name: 'Deaths', 
                value: () => {
                    return nexGui.stats.sessionDeaths;
                }
            },
        ],
        reset() {
            this.instanceCount = 0;
            this.instanceGold = GMCP.Status.gold || 0;
            this.instanceTime = performance.now();
            this.critCount = 0;
            this.update();
        },
        layout() {
            $('#statsDisplay').remove();
            let statsDisplay = $('<div></div>', {id: 'statsDisplay', style:`display:flex;justify-content:space-evenly;font-size:${this.font_size}`}).appendTo(nexGui.stats.location);
            let statsLeft = $('<div></div>', {id: 'statsLeft'}).appendTo(statsDisplay);
            let statsRight = $('<div></div>', {id: 'statsRight'}).appendTo(statsDisplay);
    
            $('#stats_instance_table').remove();
             $('<p></p>')
                .append($("<span></span>", {style: "text-decoration:underline;font-weight:bold"}).text("Instance Stats"))
                .appendTo('#statsLeft');
            $("<table></table>", {
                id: "stats_instance_table",
            }).css({
                'font-size':nexGui.stats.font_size,
                'text-align':'left',
                //'table-layout':'fixed',
                'max-width':'100%',
                'border-spacing':'0px'
            }).appendTo(statsLeft);
            $('<th></th>', {style:"width:auto"}).appendTo('#stats_instance_table');
            $('<th></th>', {style:"width:auto"}).appendTo('#stats_instance_table');
            $('#stats_instance_table').appendTo('#statsLeft');
            
            $('<input></input>', {type:'submit', value:'Reset'})
                .on('click', ()=>{nexGui.stats.reset()}).appendTo('#statsLeft');
            
            $('#stats_session_table').remove();
             $('<p></p>')
                .append($("<span></span>", {style: "text-decoration:underline;font-weight:bold"}).text("Session Stats"))
                .appendTo('#statsRight');
            $("<table></table>", {
                id: "stats_session_table",
            }).css({
                'font-size':nexGui.stats.font_size,
                'text-align':'left',
                //'table-layout':'fixed',
                'max-width':'100%',
                'border-spacing':'0px'
            }).appendTo(statsLeft);
            $('<th></th>', {style:"width:auto"}).appendTo('#stats_session_table');
            $('<th></th>', {style:"width:auto"}).appendTo('#stats_session_table');
            $('#stats_session_table').appendTo('#statsRight');
            
            this.update();
            
        },
        update() {
            $('#stats_instance_table tr').remove();
            $('#stats_session_table tr').remove();
            this.instanceEntries.forEach(e => {
                let entry = $('<tr></tr>', {id: `stats_${e.id}`});
                $('<td></td>', {}).text(`${e.name}:`).appendTo(entry);
                $('<td></td>', {}).text(`${e.value()}`).appendTo(entry);
                entry.appendTo('#stats_instance_table');
            });
            this.sessionEntries.forEach(e => {
                let entry = $('<tr></tr>', {id: `stats_${e.id}`});
                $('<td></td>', {}).text(`${e.name}:`).appendTo(entry);
                $('<td></td>', {}).text(`${e.value()}`).appendTo(entry);
                entry.appendTo('#stats_session_table');
            });
        }
    },

    msg: {
        brief: false,
        crits: [
        ['a CRITICAL', '2x'],
        ['CRUSHING', '4x'],
        ['OBLITERATING', '8x'],
        ['ANNIHILATINGLY', '16x'],
        ['WORLD', '32x']
        ],
        percentColor(percent) {
            let hpcolor = '';
            if (percent > 75) {
                hpcolor = 'limegreen';
            } else if (percent > 50) {
                hpcolor = 'yellow';
            } else if (percent > 20) {
                hpcolor = 'orange';
            } else if (percent >= 0) {
                hpcolor = 'red';
            } else {
                hpcolor = 'white';
            }
            return hpcolor;
        },
        checkCrit() {
            let dmg = 'Hit';
            for(let i = 0; i < this.crits.length; i++) {
                let block = current_block[current_block.indexOf(current_line)+1];
                if (typeof block.line === 'undefined') {
                    break;
                }
                let line = block.line;
    
                if (line && line.indexOf(this.crits[i][0]) > 0) {
                    block.gag = true;
                    dmg = this.crits[i][1];
                    break;
                }
            }
            return dmg;
        },
        formatWho(who) {
            let color = nexGui.cdb.players[who] ? nexGui.colors.city[nexGui.cdb.players[who].city] : 'grey';
            if (who == 'Self') {color = 'cyan'};

            return $("<div></div>").css({
               display:'table-cell',
                width: '30%',
                color: color
           }).text(who)
        },
        // There seems to be an industry guideline that you should not use HTML table for formatting purposes.
        // Rewrote this function to replicate the evenly spaced out display with divs.
        actionMsg(who = '', what = '', subject = '') {
            if (nexGui.colors.attacks[what.toLowerCase()]) {this.attackMsg(who, what, subject);return;}           
            let tab = $("<div></div>", {class: "mono"}).css({
                display:'inline-table',
               'width': 'calc(100% - 14ch)',
               'text-align': 'left',
               'table-layout': 'fixed'
            });
            let row = $("<div></div>").css({
                display:'table-row'
            }).appendTo(tab)

            $("<div></div>").css({
                display:'table-cell',
                    width: '5%'
            }).text('').appendTo(row);
            this.formatWho(who).appendTo(row)

            $('<div></div>').css({
                display:'table-cell',
                    width: '30%'
            }).text(what).appendTo(row);

            $("<div></div>").css({
                display:'table-cell'
            }).append($('<span></span>', {style:'color:white'}).text(subject)).appendTo(row)

            nexPrint(tab[0].outerHTML);  
        },
        attackMsg(who, what, subject) {

            if(who == 'Self' && nexGui.msg.brief == true) {
                this.attackMsgBrief(what, subject);
                return;
            }

            let tab = $("<div></div>", {class: "mono"}).css({
                display:'inline-table',
               'width': 'calc(100% - 14ch)',
               'text-align': 'left',
               'table-layout': 'fixed'
           });
           let row = $("<div></div>").css({
                display:'table-row'
            }).appendTo(tab)

            $("<div></div>").css({
                display:'table-cell',
                    width: '5%'
            }).text('').appendTo(row);
            this.formatWho(who).appendTo(row);
            
            let cellWhat = $('<div></div>').css({
                display:'table-cell',
                    width: '30%'
                }).appendTo(row);
            $('<span></span>', {style:"color:white"}).text('[').appendTo(cellWhat);
            $('<span></span>', {style:"color:orange"}).text(what).appendTo(cellWhat);
            $('<span></span>', {style:"color:white"}).text(`]`).appendTo(cellWhat);
                
            
            if (subject.toLowerCase() == 'you') {
                $("<div></div>").css({
                    display:'table-cell',
                    color: 'cyan'
                }).text('Self').appendTo(row);
                nexPrint(tab[0].outerHTML); 
                return;
            }

            // Is the target a player?
            if(!nexGui.cdb.players[subject]) {
                // If the target is not a player then the attack could possibly crit.
                $('<span></span>', {style:"color:white"}).text(`:${this.checkCrit()}`).appendTo(cellWhat);

                // if the target matches our target we should know how much damage the attack did and the health of the target.
                if (subject == GMCP.TargetText) {
                    $('<span></span>', {style:"color:white"}).text('(').appendTo(cellWhat);
                    $('<span></span>', {style:'color:grey'}).text(`${GMCP.TargetHP?/*GMCP.TargetHP*/(GMCP.TargetHP_Change)+"%":''}`).appendTo(cellWhat);
                    $('<span></span>', {style:"color:white"}).text(')').appendTo(cellWhat);
                    
                    // Add the subject portion of the line.
                    let hpperc = parseInt(GMCP.TargetHP.slice(0,GMCP.TargetHP.length-1,1));
                    let cellSubject = $("<div></div>").css({
                        display:'table-cell'
                    })
                    $('<span></span>', {style:"color:white"}).text('(').appendTo(cellSubject);
                    $('<span></span>', {style:`color:${this.percentColor(hpperc)}`}).text(`${GMCP.TargetHP?GMCP.TargetHP:' '}`).appendTo(cellSubject);
                    $('<span></span>', {style:"color:white"}).text(')').appendTo(cellSubject);
                    $('<span></span>', {style:'color:white'}).text(subject).appendTo(cellSubject);
                    cellSubject.appendTo(row)                   
                } else {
                    this.formatWho(subject).css({color: 'white', width:'auto'}).appendTo(row)
                }
            }

            nexPrint(tab[0].outerHTML);  
        },
        attackMsgBrief(what, subject) {
            let tab = $("<div></div>", {class: "mono"}).css({
                display:'inline-table',
               'width': 'calc(100%)',
               'text-align': 'left',
               'table-layout': 'fixed',
                'font-size': '11px'
           });
           let row = $("<div></div>").css({
                display:'table-row'
            }).appendTo(tab)
            $('<div></div>', {class: "timestamp"}).css({display:'table-cell',color:'grey'}).text(client.getTime('ms')).appendTo(row);
            let cellWhat = $('<div></div>').css({
                display:'table-cell',
                    width: '50%'
                }).appendTo(row);
            $('<span></span>', {style:"color:white"}).text('[').appendTo(cellWhat);
            $('<span></span>', {style:"color:orange"}).text(what).appendTo(cellWhat);
            $('<span></span>', {style:"color:white"}).text(`]`).appendTo(cellWhat);

            // Is the target a player?
            if(!nexGui.cdb.players[subject]) {
                // If the target is not a player then the attack could possibly crit.
                $('<span></span>', {style:"color:white"}).text(`:${this.checkCrit()}`).appendTo(cellWhat);

                // if the target matches our target we should know how much damage the attack did and the health of the target.
                if (subject == GMCP.TargetText) {                 
                    // Add the subject portion of the line.
                    let hpperc = parseInt(GMCP.TargetHP.slice(0,GMCP.TargetHP.length-1,1));
                    let cellSubject = $("<div></div>").css({
                        display:'table-cell'
                    })
                    $('<span></span>', {style:"color:white"}).text('(').appendTo(cellSubject);
                    $('<span></span>', {style:`color:${this.percentColor(hpperc)}`}).text(`${GMCP.TargetHP?GMCP.TargetHP:' '}`).appendTo(cellSubject);
                    $('<span></span>', {style:"color:white"}).text(')').appendTo(cellSubject);
                    cellSubject.appendTo(row)                   
                } else {
                    $("<div></div>").css({
                display:'table-row'
            }).text('').appendTo(row)
                }
            }

            nexGui.stream.write('#tbl_2h3a', tab);  
        }
    },

    pvp: {
        location: '#tbl_2h4b',
        font_size: '11px',
        layout() {  
            // Split the pane into two halves.
            $('#pvpDisplay').remove();
            $('#pvpLeft').empty();
            $('#pvpRight').empty();
            let pvpDisplay = $('<div></div>', {id: 'pvpDisplay', style:`display:flex;justify-content:space-evenly;font-size:${this.font_size}`}).appendTo(this.location);
            let pvpLeft = $('<div></div>', {id: 'pvpLeft'}).appendTo(pvpDisplay);
            let pvpRight = $('<div></div>', {id: 'pvpRight'}).appendTo(pvpDisplay);        
    
            // Table for holding all of our pvp toggles
            let toggleTableLeft = $('<table></table>', {
                id: 'pvpToggleTableLeft',
                'font-size':'11px',
                'text-align':'left',
                //'table-layout':'fixed',
                'max-width':'100%',
                'border-spacing':'0px'})
            $('<caption></caption>', {style: 'text-decoration:underline;font-weight:bold'}).text('Class').appendTo(toggleTableLeft);
            $('<th></th>', {style:"width:auto"}).appendTo(toggleTableLeft);
            $('<th></th>', {style:"width:auto"}).appendTo(toggleTableLeft);
    
            let toggleTableRight = $('<table></table>', {
                id: 'pvpToggleTableRight',
                'font-size':'11px',
                'text-align':'left',
                //'table-layout':'fixed',
                'max-width':'100%',
                'border-spacing':'0px'})
            $('<caption></caption>', {style: 'text-decoration:underline;font-weight:bold'}).text('Defences').appendTo(toggleTableRight);
            $('<th></th>', {style:"width:auto"}).appendTo(toggleTableRight);
            $('<th></th>', {style:"width:auto"}).appendTo(toggleTableRight);
    
            toggleTableLeft.appendTo(pvpLeft);
            toggleTableRight.appendTo(pvpRight);
        }
    },

    def: {
        location: '#tbl_5a',
        font_size: '12px',
        font_color: 'red',
        background_color: 'pink',
        keepup: [],
        layout() {
            $(this.location).empty();
            $('<div></div>')
                .css({
                    'width': '100%',
                    'text-align': 'center'
                })
                .append($("<span></span>", {style: "text-decoration:underline;font-weight:bold;text-align:center"}).text("Missing Defs"))
                .appendTo(this.location);
        },
        add(def) {
            if (this.keepup.indexOf(def) == -1) {return;}
            
            let d = $('<div></div>', {id: `def-${def}`})
            .css({
                color: this.font_color,
                'font-size': this.font_size,
                'background-color': this.background_color,
                width: '100%',
                'text-align': 'center',
                //'font-weight': 'bold',
                opacity: '60%',
                margin: '2px 0px 0px 0px'
            })
            .text(def.toProperCase())
            d.appendTo(this.location);
        },
        remove(def) {
            $(`#def-${def}`).remove();
        },
        update(defs) {
            this.layout();
            this.keepup.forEach(e=>{
                if (defs.findIndex(el=>el.name == e) == -1)
                    this.add(e)
            })
        }
        
    },

    timer: {
        location: '#tbl_5b',
        font_size: '11px',
        _timer: {},
        _start() {
            this._timer = setInterval(nexGui.timer._callBack, 1000);
        },
        _stop() {clearInterval(this._timer)},
        _callBack() {
            $('.nexGui_timer').each(function() {
                let num = parseInt($(this).text());
                if (num == 0) {return};
                num--;
                $(this).text(num);
            });
        },
        add(id, label, duration = 0) {
            $('<tr></tr>')
                    .append($('<td></td>', {style: `padding:0px 5px 0px 0px;display:block;font-weight:bold;font-size:${this.font_size}`}).text(label))
                    .append($('<td></td>', {id: `${id}Timer`, class: "nexGui_timer", style: "padding:0px 5px 0px 0px"}).text(0))
                    .appendTo('#nexTimerTable');
            this[id] = {
                id: id,
                duration: duration+1,
                start() {$(`#${id}Timer`).text(this.duration)}
            }
        },
        remove(id) {
            $(`#${id}Timer`).remove();
            delete this[id];
        },
        layout() {
            $(this.location).empty();
            // Table for holding all of our timers.
            let timerTable = $('<table></table>', {
                id: 'nexTimerTable',
                'font-size': this.font_size,
                'text-align':'left',
                //'table-layout':'fixed',
                'max-width':'100%',
                'border-spacing':'0px'})
            $('<caption></caption>', {style: 'text-decoration:underline;font-weight:bold'}).text('Timers').appendTo(timerTable);
            $('<th></th>', {style:"width:auto"}).appendTo(timerTable);
            $('<th></th>', {style:"width:auto"}).appendTo(timerTable);
            
            timerTable.appendTo(this.location);
            this._start();
        }
    
    },

    feed: {
        url: 'https://api.achaea.com/gamefeed.json',
        location: '#tbl_2h3c',
        font_size: '11px',
        lastEntry: false,
        interval: 1000,
        timer: {},
        start() {
            this.timer = setInterval(nexGui.feed.fetch, this.interval);
        },
        stop() {clearInterval(this.timer)},
        layout() {
            $(this.location).empty();
            $(this.location).css({
                position:'absolute',
                bottom: 0,
                left: 0,
                width: 'auto',
                margin: '5px',
                height: 'auto'
            });
            this.start();
        },
        fetch() {
            $.getJSON( nexGui.feed.url, function(data) {
                if(!nexGui.feed.lastEntry) {
                    nexGui.feed.lastEntry = data[24];
                }
                nexGui.feed.add(data);
            });
        },
        add(data) {
            let index = data.findIndex(e=>e.id == this.lastEntry.id);
            if (index == 24) {return}
            for(let i = index+1; i < 25; i++) {
                let entry = $('<div></div>', {class: 'nexGui_feed'}).css({'font-size':this.font_size})
                $('<span></span>', {class: "timestamp"}).css({color:'grey'}).text(client.getTimeNoMS()+" ").appendTo(entry)
                $('<span></span>').text(nexGui.colors.highlightNames(data[i].description)).appendTo(entry)
                entry.appendTo(this.location);
                if ($(this.location).children().length > 100) {
                    $(this.location).children()[0].remove()
                }
            }
            $(this.location).animate({ scrollTop: 9999 }, "fast");
            this.lastEntry = data[24];
        }
    },

    stream: {
        msgLimit: 100,
        write(location, msg) {
            $('<span></span>', {class: "timestamp"}).css({color:'grey'}).text(client.getTimeNoMS()+" ").prependTo(entry);
            msg.appendTo(location);
            if ($(location).children().length > this.msgLimit) {
                $(location).children()[0].remove()
            }
        }
    },

    target: {
        font_size: '11px',
        location: '#tbl_5d',
        
        layout() {
            $(this.location).empty();
            $(this.location).css('font-size', this.font_size);
            
            $('<div></div>')
                .css({
                    'width': '100%',
                    'text-align': 'center',
                    'font-size': '13px'
                })
                .append($("<span></span>", {style: "text-decoration:underline;font-weight:bold;text-align:center"}).text("Target State"))
                .appendTo(this.location);
            
            let title = $('<div></div>', {style:'display:table-row'}).appendTo(this.location);
            $('<span></span>', {style:`display:table-cell;color:cyan;padding:0px 5px 0px 0px`}).text(`[${cdb.characterServerList['Khaseem'].class}]`).appendTo(title);
            $('<span></span>', {style:`display:table-cell;color:${cdb.city_colours[cdb.characterServerList['Khaseem'].city]||this.nameColor}`}).text('Khaseem').appendTo(title);
            
            let location = $('<div></div>', {style:'display:table-row'}).appendTo(this.location);
            $('<span></span>', {display:'table-cell',style:`display:table-cell;padding:0px 5px 0px 0px`}).text('Location:').appendTo(location);
            $('<span></span>', {display:'table-cell',style:`display:table-cell;padding:0px 5px 0px 0px`}).text('Here').appendTo(location);
            
            let mana = $('<div></div>', {style:'display:table-row'}).appendTo(this.location);
            $('<span></span>', {display:'table-cell',style:`display:table-cell;padding:0px 5px 0px 0px`}).text('Mana:').appendTo(mana);
            $('<span></span>', {display:'table-cell',style:`display:table-cell;padding:0px 5px 0px 0px`}).text('6877/6877 (100%)').appendTo(mana);
            
            let tree = $('<div></div>', {style:'display:table-row'}).appendTo(this.location);
            $('<span></span>', {display:'table-cell',style:`display:table-cell;padding:0px 5px 0px 0px`}).text('Tree:').appendTo(tree);
            $('<span></span>', {display:'table-cell',style:`display:table-cell;padding:0px 5px 0px 0px`}).text('0').appendTo(tree);
            
            let classCure = $('<div></div>', {style:'display:table-row'}).appendTo(this.location);
            $('<span></span>', {display:'table-cell',style:`display:table-cell;padding:0px 5px 0px 0px`}).text('Class Cure:').appendTo(classCure);
            $('<span></span>', {display:'table-cell',style:`display:table-cell;padding:0px 5px 0px 0px`}).text('0').appendTo(classCure);
            
            let lust = $('<div></div>', {style:'display:table-row'}).appendTo(this.location);
            $('<span></span>', {display:'table-cell',style:`display:table-cell;padding:0px 5px 0px 0px`}).text('Lust:').appendTo(lust);
            $('<span></span>', {display:'table-cell',style:`display:table-cell;padding:0px 5px 0px 0px`}).text('false').appendTo(lust);
            
            let truename = $('<div></div>', {style:'display:table-row'}).appendTo(this.location);
            $('<span></span>', {display:'table-cell',style:`display:table-cell;padding:0px 5px 0px 0px`}).text('Truename:').appendTo(truename);
            $('<span></span>', {display:'table-cell',style:`display:table-cell;padding:0px 5px 0px 0px`}).text('0').appendTo(truename);
            
            let defs = $('<div></div>', {style:'display:table-row'}).appendTo(this.location);
            $('<span></span>', {display:'table-cell',style:`display:table-cell;padding:0px 5px 0px 0px`}).text('Missing:').appendTo(defs);
            $('<span></span>', {display:'table-cell',style:`display:table-cell;padding:0px 5px 0px 0px`}).text('[Insomnia]').appendTo(defs);
        }
    
    },

    cdb: {
        players: {},
        gmcpChannelPlayers(args) {
            for(let i = 0; i < args.length; i++) {
                if (!this.players[args[i].name]) {
                    this.getCharacterByName(args[i].name);
                }
            }
        },
        getCharacterServerList() {
            $.getJSON( "https://api.achaea.com/characters.json", function( data ) {
                for (let i = 0; i < data.characters.length; i++) {
                    nexGui.cdb.getCharacterByURI(data.characters[i].uri);
                }
            });
        },
        addCharacterToMongo(data) {
            data.time = client.Date();
            data.user = GMCP.Status.name;
            if (this.players[data.name]) {
                if (data.city == "(hidden)" || data.city == "(none") {
                    data.city = this.players[data.name].city;
                }
                nexGui.mongo.db.updateOne({'name':data.name}, data);
            } else {
                nexGui.mongo.db.insertOne(data);
            }
            nexGui.cdb.players[data.name] = data;
            nexGui.cdb.players[data.name].regex = new RegExp('\\b'+data.name+'\\b', 'g');
        },
        getCharacterByURI(uri) {
            $.getJSON( uri, function( data ) {
                nexGui.cdb.addCharacterToMongo(data);
            });
        },
        
        getCharacterByName(name) {
            $.getJSON( "https://api.achaea.com/characters/" + name.toLowerCase() + ".json", function ( data ) {
                nexGui.cdb.addCharacterToMongo(data);
            })
            .fail(function() {
                nexGui.mongo.db.deleteOne({'name':name})
                console.log(`nexGui.cdb.getCharacterByName(${name}) failed. Entry deleted from database.`)
            });
        },
        updateCity(name, city) {
            city = city.toLowerCase();
            if (!nexGui.colors.city[city]) {nexPrint('Incorrect city string in update');return;}

            name = name.toProperCase();
            
            if (nexGui.colors.city[city] && nexGui.cdb.players[name]) {
                nexGui.cdb.players[name].city = city;
                let update = JSON.parse(JSON.stringify(nexGui.cdb.players[name]));                
                delete update['regex'];              
                nexGui.mongo.db.updateOne({'name':update.name}, update);
                nexPrint(`Database updated ${name} to City ${city}`);
            }
        }
    },

    mongo: {
        collect() {
            /*
            // Get all denizens in the current room
            let roomDenizens = GMCP.Char.Items.List.items.filter(x => x.attrib == 'm' && !this.ignoreList.some(rx => rx.test(x.name)));// || x.attrib == 'mx');
            let newDenizens = [];
            let roamers = [];

            if(roomDenizens.length>0) {
                // Remove any denizens that are already in the entries
                newDenizens = roomDenizens.filter(x => !this.entries.find(y => x.id == y.id));
                if (this.logging) {console.log(newDenizens);}
                // Find denizens that already have entries, but are in a new room.
                roamers = roomDenizens.filter(x => this.entries.find(y => x.id == y.id && !y.room.includes(GMCP.Room.Info.num)));
            }
            else
                return;
    
            // Add room number and area to each denizen object
            for(let denizen of newDenizens) {
                denizen.room = [GMCP.Room.Info.num];
                denizen.area = {name: GMCP.Room.Info.area, id: GMCP.CurrentArea.id}
                denizen.user = {
                    id: this.user.id,
                    name: GMCP.Status.name
                }
                this.entries.push(denizen);
                this.db.insertOne(denizen);           
            }
    
            for(let denizen of roamers) {
                console.log(denizen);
                let denizenUpdate = this.entries.find(x => x.id == denizen.id)
                console.log(denizenUpdate);
                denizenUpdate.room.push(GMCP.Room.Info.num);
                this.db.updateOne({id:denizenUpdate.id}, {$set:{room:denizenUpdate.room}})
            }   
            */
        },
        async startUp() {
            console.log('Mongo startup called');

            if (!Realm) {
                console.log('Mongo startup cancelled. Realm not loaded.');
                return;
            }

            this.app = new Realm.App({ id: "nexmap-izeal" });
            this.apiKey = "pE7xABGhoWjv2XvSLvON4D2oOSF8WcmEwXkLoKzE2bqlIX1HpkxQIJTLUbr0qhPw"; // Provided API key
            this.credentials = await Realm.Credentials.apiKey(this.apiKey);
            this.user = await this.app.logIn(this.credentials)
            this.user.id === this.app.currentUser.id;
            this.mongodb = this.app.currentUser.mongoClient("mongodb-atlas");
            this.db = this.mongodb.db('nexCDB').collection('characters')
            //this.entries = await this.db.find({}, {projection: {area:1, attrib:1, icon:1, id:1, name:1, room:1}});
            let entries = await this.db.find({}, {projection: {_id:0, user: 0}});
            entries.forEach(e=>{
                nexGui.cdb.players[e.name]=e;
                nexGui.cdb.players[e.name].regex=new RegExp('\\b'+e.name+'\\b', 'g');
            });
            nexGui.cdb.getCharacterServerList();
            console.log('MongoDB loaded');
            nexGui.notice(`Player database loaded with ${entries.length} entries.`);
        },
        ignoreList: [
            /a dervish/,
            /a sharp-toothed gremlin/,
            /a chaos orb/,
            /a bloodleech/,
            /a minion of chaos/,
            /a worm/,
            /a green slime/,
            /a soulmaster/,
            /a humbug/,
            /a chimera/,
            /a bubonis/,
            /a chaos storm/,
            /a chaos hound/,
            /a withered crone/,
            /a pathfinder/,
            /a doppleganger/,
            /an ethereal firelord/,
            /a simpering sycophant/,
            /a water weird/,
            /an eldritch abomination/,
            /Khaseem/,
            /a guardian angel/,
            /a diminutive homunculus/,
            /a Baalzadeen/,
            /shipmate/,
            /a squad of/,
            /swashbuckler/
        ]
    }
}