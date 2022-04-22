'use strict'

const nexGui = {
    version: '0.9.0',
    character: {
        hp: 0,
        hpDiff: 0,
        oldHP: 0,
        profession: 'none',
        classBalanceType: 'Entity' // This is from GMCP.CharStats or GMCP.Char.Vitals
    },
    
    inject(rule) {
        if (!$('#client_nexgui-rules').length) {
            $('head').append('<style id="client_nexgui-rules"></style>')
        };

        document.getElementById('client_nexgui-rules').innerHTML += rule+"\n";
    },
    generateStyle() {
        $('#client_nexgui-rules').remove();
        //this.inject('.nexswitch {position: relative;display: inline-block;width: 38px;height: 21px;}');
        this.inject('.nexGuiSwitch {position: relative;display: inline-block;width: 26px;height: 16px;}');
        this.inject('.nexGuiSwitch input {opacity: 0;width: 0;height: 0;}');
        //this.inject('.nexslider {position: absolute;cursor: pointer;top: 0;left: 0;right: 0;bottom: 0;background-color: #555555;-webkit-transition: .4s;transition: .4s;border-radius: 24px;}');
        this.inject('.nexGuiSlider {position: absolute;cursor: pointer;top: 0;left: 0;right: 0;bottom: 0;background-color: #555555;-webkit-transition: .4s;transition: .4s;border-radius: 16px;}');       
        //this.inject('.nexslider:before {position: absolute;content: "";height: 15px;width: 15px;left: 3px;bottom: 3px;background-color: white;-webkit-transition: .4s;transition: .4s;border-radius: 50%;}');
        this.inject('.nexGuiSlider:before {position: absolute;content: "";height: 10px;width: 10px;left: 3px;bottom: 3px;background-color: white;-webkit-transition: .4s;transition: .4s;border-radius: 50%;}');
        this.inject('input:checked + .nexGuiSlider {background-color: #2196F3;}');
        this.inject('input:focus + .nexGuiSlider {box-shadow: 0 0 1px #2196F3;}');
        //this.inject('input:checked + .nexslider:before {-webkit-transform: translateX(16px);-ms-transform: translateX(16px);transform: translateX(16px);}');
        this.inject('input:checked + .nexGuiSlider:before {-webkit-transform: translateX(10.7px);-ms-transform: translateX(10.7px);transform: translateX(10.7px);}');
        
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

        // Room players
        this.inject('.nexGui_room-player   { margin: 1px 5px 1px 5px; padding: 2px; height: 17px; font-size: 12px}');        

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

        // Timer gauges
        this.inject(`.nexGuiTimerContainer {
            position: relative;
            height: 16px;
            border: 1px silver solid;
            border-radius: 6px;
            overflow: hidden;
            margin:3px 0px
        }`)
        this.inject(`.nexGuiTimerGauge {
                height:100%;
                width:100%;
                border-radius: 5px;
                transform-origin: left center;
                transform: scaleX(1);
                z-index: 1;
                will-change: transform, color;
                position: relative
        }`)
        this.inject(`.nexGuiTimerLabel {
                position: relative;
                top: -100%;
                width: 65%;
                z-index: 3;
                margin: 0px 0px 0px 5px;
                display: inline-block
        }`)
        this.inject(`.nexGuiTimerText {
                position: relative;
                top: -100%;
                width: 25%;
                z-index: 3;
                display: inline-block
        }`)

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
        handler = handler ? 
            handler :
            (e)=>{
                nexSys.eventStream.raiseEvent(`nexGui-option-${title.replaceAll(' ','')}`, e.target.checked);
            }
        let optionRow = $('<tr></tr>', {id:`nexGui-option-${title.replaceAll(' ','')}`});
        $('<td></td>', {style: `padding:0px 5px 0px 0px;display:block;font-weight:bold`}).html(title).appendTo(optionRow);

        let lab = $('<label></label>', {
            'class': 'nexGuiSwitch nexInput'
        });
        $('<input></input>', {
            type: "checkbox",
            'class': 'nexGuiBox nexGuiInput'
        })
            .prop('checked', option)
        	.on('change', handler)
            .appendTo(lab);
        $('<span></span>', {
            'class': 'nexGuiSlider nexGuiInput'
        }).appendTo(lab);
        $('<td></td>').append(lab).appendTo(optionRow);
        optionRow.appendTo(container);
    },
    layout() {
        /***********************************************************************
            Start with the Nexus minimal theme and override from there.
         ***********************************************************************/
        client.set_css_style('minimal');
        client.apply_stylesheet()
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
        let box_2h4 = makeBox('2h4', 'hbox', 0.25, '2');
        let box_2h1 = makeBox('2h1', 'hbox', 0.45, '2');
        let box_2h2 = makeBox('2h2', 'hbox', 0.05, '2');
        let box_2h3 = makeBox('2h3', 'hbox', 0.25, '2');
        //let box_2h4 = makeBox('2h4', 'hbox', 0.25, '2');

        //Adds a 2 stack box to the left of the Map window
        let box_2h1v1 = makeBox('2h1v1', 'vbox', 0.333, '2h1');
        let box_2h1v2 = makeBox('2h1v2', 'vbox', 0.666, '2h1');

        // Moves the default map tap into our new container.
        box_2h1v2.elements = [JSON.parse(JSON.stringify(find_client_layout_element('box_2').elements[0]))];
        $('#container_1').appendTo('#box_2h1v2').css('height', '100%');

        box_2h1.elements = [box_2h1v1, box_2h1v2]
        //find_client_layout_element('box_2').elements = [box_2h1, box_2h2, box_2h3, box_2h4];
        find_client_layout_element('box_2').elements = [box_2h4, box_2h2, box_2h3, box_2h1];

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
        makeTab(tab_2h4b, ["2h4b2", "2h4b2", "2h4b2", '', 'container_2h4b']);
        var tab_2h4b = makeTab(tab_2h4b, ["2h4b", "2h4b", "2h4b", '', 'container_2h4b']);
        makeTab(tab_2h4c, ["2h4c2", "2h4c2", "2h4c2", '', 'container_2h4c']);
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
        $('#status-ping').prependTo('#character_module_status');
        $('#status-ping').css('width', '8%');
        $('#status-target').css('width', `${client.innerWidth< 1700?'70%':'73%'}`);
        $('#character_module_status').css('width', '23%');
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
            'width': `${client.innerWidth< 1700?'28%':'35%'}`,
            'padding': '2px 0 0 0'
        });
        $('<div></div>', {id:'character_module_balances', class: 'reduced', style: 'padding: 0 5px 0 0'})
        .append($('<div></div>', {id:'character_module_balance', class: 'balance bal'}))
        .append($('<div></div>', {id:'character_module_equilibrium', class: 'balance eq'}))
        .append($('<div></div>', {id:'character_module_class', class: 'balance class-balance'}))
        .insertBefore('#gauges');

        let mod2 = $('<div></div>', {id:"character_module_status", style:`width: ${client.innerWidth< 1700?'21%':'18%'}`}).insertAfter('#gauges');
        $('#status-level, #status-gold, #status-bank').appendTo(mod2);
        $('#status-level, #status-gold, #status-bank').css('width', '70px');

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
        find_client_layout_element('box_3').weight=0.48;
        find_client_layout_element('box_2').weight=0.44;  
        /***********************************************************************
            Run update to fit all windows to new sizes
         ***********************************************************************/
        client.redraw_interface();

        nexGui.room.layout();
        nexGui.stats.layout();
        nexGui.party.layout();
        nexGui.timer.layout();
        nexGui.def.layout();
        nexGui.feed.layout();
        nexGui.target.layout();
        nexGui.aff.layout();
        nexGui.stream.layout();
        nexGui.optionsPane.layout();
        nexGui.pvp.layout();
        nexGui.generateStyle();
    },
    restoreLayout() {
        ['#tbl_5a', '#tbl_5b', '#tlb_5c', '#tlb_5d'].forEach(e => $(e).empty());
        $('#tlb_2h4b').empty();
        nexGui.pvp.layout();
        nexGui.timer.layout();
        nexGui.def.layout();
        nexGui.target.layout();
        nexGui.self.layout();
    },
    notice(txt, html = false) {
        let msg = $('<span></span>', {
            class: "mono"
        });
        $('<span></span>', {
            style: 'color:DodgerBlue'
        }).html('[-').appendTo(msg);
        $('<span></span>', {
            style: 'color:OrangeRed'
        }).html('nexGui').appendTo(msg);
        $('<span></span>', {
            style: 'color:DodgerBlue'
        }).html('-] ').appendTo(msg);
    
        if (html) {
            txt.appendTo(msg)
        } else {
            $('<span></span>', {
                style: 'color:GoldenRod'
            }).html(txt).appendTo(msg)
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

        client.next_line = function() {
            let nextLine = current_block[current_block.indexOf(current_line)+1];
            console.log(nextLine);
            return nextLine.parsed_line ? nextLine.parsed_line.text() : '';
        }
        
        //nexSys.eventStream.removeListener('Comm.Channel.Players', 'channelPlayersMongo');

        this.restoreEvents();
        this.layout();
        client.gag_comm = false;
        client.send_direct('stat');
        client.send_direct('pwho');
        client.send_direct('enemies');
        client.send_direct('allies');
        client.send_direct('def');
        client.send_direct('ql');
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
        nexSys.eventStream.removeListener('Char.Afflictions.Remove', 'nexGuiAfflictionRemove');
        nexSys.eventStream.removeListener('Char.Afflictions.Add', 'nexGuiAfflictionAdd');
        nexSys.eventStream.removeListener('Char.Afflictions.List', 'nexGuiAfflictions');
        nexSys.eventStream.removeListener('Char.Status', 'nexGuiCharStatus');   
        nexSys.eventStream.removeListener('Char.Status', 'nexGuiTarget');    
        nexSys.eventStream.removeListener('IRE.Misc.Achievement', 'nexGuiMiscAchievement');
        nexSys.eventStream.removeListener('Comm.Channel.Players', 'channelPlayersMongo');
        nexSys.eventStream.removeListener('Char.Vitals', 'nexGuiClassBalance');
        nexSys.eventStream.removeListener('IRE.Target.Info', 'nexGuiTarget');
        nexSys.eventStream.removeListener('IRE.Target.Set', 'nexGuiStreamTarget');

        // Populate nexGUI GMCP events
        let nexGuiStreamTarget = function(arg) {
            if (!arg) { return; }
            nexGui.stream.write('#nexGuiAttackStream', [
            `<span class='' style="color:red">[ Target ]</span>`,
            `<span>${arg ? arg : 'Cleared'}</span>`
            ]);
        }
        nexSys.eventStream.registerEvent('IRE.Target.Set', nexGuiStreamTarget);

        let nexGuiTarget = function(args) {
            if (!args.target) {return;}

            $('.nexGui_room-target').removeClass('nexGui_room-target');
            if (GMCP.TargetIsPlayer) {
                $(`#player-${GMCP.Target}`).addClass('nexGui_room-target');
                $('.nexGui_room-target').prependTo('#room_player_table');
            } else {
                $(`#npc-${GMCP.Target}`).addClass('nexGui_room-target');
                $('.nexGui_room-target').prependTo('#room_npc_table');
            }
        }
        nexSys.eventStream.registerEvent('Char.Status', nexGuiTarget);

        let nexGuiRoomAddAll = function(args) {
            nexGui.room.addAll(args.items);
        }
        nexSys.eventStream.registerEvent('Char.Items.List', nexGuiRoomAddAll);
        nexSys.eventStream.registerEvent('Char.Items.List', nexGuiTarget);

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
        }
        nexSys.eventStream.registerEvent('Room.Players', nexGuiRoomPlayers);

        let nexGuiAddPlayer = function(args) {
            nexGui.room.players.add(args.name);
        }
        nexSys.eventStream.registerEvent('Room.AddPlayer', nexGuiAddPlayer);

        let nexGuiRemovePlayer = function(args) {
            nexGui.room.players.remove(args);
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

        let nexGuiAfflictionAdd = function(args) {
            nexGui.aff.add(args.name);
        }
        nexSys.eventStream.registerEvent('Char.Afflictions.Add', nexGuiAfflictionAdd);

        let nexGuiAfflictionRemove = function(args) {
            nexGui.aff.remove(args[0]);
        }
        nexSys.eventStream.registerEvent('Char.Afflictions.Remove', nexGuiAfflictionRemove);

        let nexGuiAfflictions = function(args) {
            nexGui.aff.update(args);
        }
        nexSys.eventStream.registerEvent('Char.Afflictions.List', nexGuiAfflictions);

        let nexGuiTargetInfo = function(args) {
            GMCP.TargetHP_Change = parseInt(GMCP.TargetHP_Old.slice(0,GMCP.TargetHP_Old.length-1,1))-parseInt(GMCP.TargetHP.slice(0,GMCP.TargetHP.length-1,1));
            GMCP.TargetHP_Old = args.hpperc;
        }
        nexSys.eventStream.registerEvent('IRE.Target.Info', nexGuiTargetInfo);

        let nexGuiCharStatus = function() {
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

        let nexGuiClassChange = function(args) {
            if (!args.class) {return;}
            let profession = args.class.toLowerCase();
            switch(profession) {
                case 'air elemental lord':
                    profession = 'airlord';
                    break;
                case 'fire elemental lord':
                    profession = 'firelord';
                    break;
                case 'earth elemental lord':
                    profession = 'earthlord';
                    break;
                case 'water elemental lord':
                    profession = 'waterlord';
                    break;
            }
            profession = profession.indexOf('dragon') != -1 ? profession.replace(" ", '') : profession;
            if (!nexGui[profession] || nexGui.character.profession == profession) {
                nexGui.character.profession = profession;
                return;
            }
            client.run_function(`nexGui.${profession}`, {}, 'Nexgui');
            nexGui.restoreLayout();
            nexGui[profession].layout();
            nexGui.character.profession = profession;
        }
        nexSys.eventStream.registerEvent('Char.Status', nexGuiClassChange);

        let nexGuiWielded = function(args) {
            if (args.location != "inv") {return;}

            if (!args.item.attrib) {
                if (args.item.id == nexGui.self.wielded.left.id) {nexGui.self.wielded.left = false}
                if (args.item.id == nexGui.self.wielded.right.id) {nexGui.self.wielded.right = false}
            }

            if(args.item.attrib.indexOf('l') > -1) {
                nexGui.self.wielded.left = args.item;
            } else if(args.item.attrib.indexOf('L') > -1) {
                nexGui.self.wielded.right = args.item;
            } 
        }
        nexSys.eventStream.registerEvent('Char.Items.Update', nexGuiWielded);
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
        if (args.charstats.indexOf(`${nexGui.character.classBalanceType}: Yes`) != -1) {
            $('#character_module_class').css('opacity', '100%')
            nexSys.eventStream.raiseEvent(`${nexGui.character.classBalanceType.toLowerCase()}GotBalEvent`);
            return
        }
        if (args.charstats.indexOf(`${nexGui.character.classBalanceType}: No`) != -1) {
            $('#character_module_class').css('opacity', '15%')
            nexSys.eventStream.raiseEvent(`${nexGui.character.classBalanceType.toLowerCase()}LostBalEvent`);
            return
        }
    },

    colors: {
        Color: class {
            constructor(type = 'action', name, color = 'orange', text = name) {
                this._type = type;
                this._name = name;
                this._color = color;
                this._text = text;
            }
        
            get type() { return this._type; }
            get name() { return this._name; }
            get color()  { return this._color; }
            get text()   { return this._text; }
            set color(arg) { this._color = arg; }
        },

        generateColors() {
            let actions = [
                new this.Color('action', 'eat', 'gold', 'Eat'),
                new this.Color('action', 'smoke', 'orange', 'Smoke'),
                new this.Color('action', 'salve', 'aquamarine', 'Salve'),
                new this.Color('action', 'sip', 'HotPink', 'Sip'),
                new this.Color('action', 'eat', 'gold', 'Eat'),
            ]
            return actions;
        },
        gradient(percent, increments = 100, start = 0, end = 120) {
            //https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage
            // 0 is red, 120 is green. Gradient from red to green.
            let a = Math.ceil(percent/(101/increments)) == increments ? 
                Math.ceil(percent/(101/increments)) * 100/increments : 
                Math.floor(percent/(101/increments)) * 100/increments;
            let b = (end - start) * a/100;
            let c = b + start;
        
          // Return a CSS HSL string
              return `hsl(${c}, 100%, 50%)`;
        },

        highlightNames(txt) {
            let names = Object.keys(nexGui.cdb.players);
            for(let i = 0; i < names.length; i++) {
                if (txt.indexOf(names[i]) != -1) {
                    let name = nexGui.cdb.players[names[i]];
                    txt = txt.replace(name.regex, `${nexGui.room.enemies.indexOf(names[i]) != -1 ? 
                        '<span style="color:red">(</span>' : 
                        nexGui.room.enemies.indexOf(names[i]) != -1 ? 
                        '<span style="color:white">(</span>' :
                        ''
                    }<span style="color:${nexGui.colors.city[name.city]}">${names[i]}</span>${nexGui.room.enemies.indexOf(names[i]) != -1 ? 
                        '<span style="color:red">)</span>' : 
                        nexGui.room.enemies.indexOf(names[i]) != -1 ? 
                        '<span style="color:white">)</span>' :
                        ''
                    }`)
                }
            }
            return txt;
        },

        /* Experimental code. Appears to be orders of magnitude slower this way
        highlightNames(txt) {
            let players = Object.keys(nexGui.cdb.players);
            let replacer = function(player) {
                let colour = nexGui.colors.city[nexGui.cdb.players[player].city];
                let entry = $('<span></span>').css({
                    color: colour
                }).html(player);
                if (nexGui.room.enemies.indexOf(player) != -1) {
                    $('<span>(</span>', {style:'color:red'}).prependTo(entry);
                    $('<span>)</span>', {style:'color:red'}).appendTo(entry);
                } else if (nexGui.room.allies.indexOf(player) != -1) {
                    $('<span>(</span>', {style:'color:white'}).prependTo(entry);
                    $('<span>)</span>', {style:'color:white'}).appendTo(entry);
                }
                return entry[0];
            }
            let replacer1 = function(player) {
                let colour = nexGui.colors.city[nexGui.cdb.players[player].city];
                if (nexGui.room.enemies.indexOf(player) != -1) {
                    let p = '<span style="color:red">(</span>';
                    let a = '<span style="color:red">)</span>';
                } else if (nexGui.room.allies.indexOf(player) != -1) {
                    let p = '<span style="color:white">(</span>';
                    let a = '<span style="color:white">)</span>';
                }
                
                return `${p?p:''}<span style="color:${colour}">${player}</span>${a?a:''}`;
            }
            for (let i = 0; i < players.length; i++) {
                
                txt = txt.replace(nexGui.cdb.players[players[i]].regex, replacer(players[i]));
            }

            return txt;
        },*/
        room: {
            'a monolith sigil': {
                color:'red',
                text:'A MONOLITH SIGIL'
            },
            'some gold sovereigns': {
                color: 'gold',
                text: 'GOLD COINS',
            }
        },
        city: {
            "(hidden)": "gray",
            "(none)": "gray",
            ashtan: "#990099",
            cyrene: "#009999",
            eleusis: "#00e600",
            hashan: "#999900",
            mhaldor: "#e60000",
            targossas: "#ffffff",
            garden: "yellow"
        },
        attacks: {
            warp:'orange',
            incantation:'orange',
            gut:'orange',
            frostwave:'orange',
            dragonchill:'orange',
            ague:'orange',
            glaciate: 'orange',
            tailsmash:'orange',
            override:'orange',
            garrote:'orange',
            bleed:'orange',
            doubleslash:'orange',
            jab:'orange',
            iron: 'orange',
            frostrive: 'orange',
            overhand: 'orange',
            dragonspit: 'orange',
            dragonsap: 'orange',
            slaver: 'orange',
            deteriorate: 'orange',
            scour: 'orange',
            corrode: 'orange',
        },
        actions: {
            eat: {name: 'eat', color: 'gold', text:'Eat'},
            smoke: {name: 'smoke', color: 'orange', text:'Smoke'},
            salve: {name: 'salve', color: 'aquamarine', text:'Salve'},
            sip: {name: 'sip', color: 'HotPink', text:'Sip'},
            focus: {name: 'focus', color: 'BlueViolet', text: 'Focus'},
            tattoo: {name: 'tattoo', color: 'cornflowerBlue', text:'Tattoo'},

            attack: {name: 'attack', color: 'tomato', text: "\u00AB Attack \u00BB"},
            stun: {name: 'stun', color: 'red', text: "\u00AB Stun \u00BB"},
            prone: {name: 'prone', color: 'red', text: "\u00AB Prone \u00BB"},
            entangled: {name: 'entangled', color: 'red', text: "\u00AB Entangled \u00BB"},
            transfixed: {name: 'transfixed', color: 'red', text: "\u00AB Transfixed \u00BB"},
            webbed: {name: 'webbed', color: 'red', text: "\u00AB Webbed \u00BB"},
            blackout: {name: 'blackout', color: 'red', text: "\u00AB Blackout \u00BB"},
            stupidity: {name: 'stupidity', color: 'red', text: "\u00AB Stupidity \u00BB"},
            loki: {name: 'loki', color: 'red', text: "\u00AB Loki \u00BB"},
            burning: {name: 'burning', color: 'red', text: "\u00AB Burning \u00BB"},
            dizziness: {name: 'dizziness', color: 'red', text: "\u00AB Dizziness \u00BB"},
            epilepsy: {name: 'epilepsy', color: 'red', text: "\u00AB Epilepsy \u00BB"},
            unblind: {name: 'unblind', color: 'red', text: "\u00AB Unblind \u00BB"},
            brokenleg: {name: 'brokenleg', color: 'red', text: "\u00AB Broken Leg \u00BB"},
            brokenarm: {name: 'brokenarm', color: 'red', text: "\u00AB Broken Arm \u00BB"},
        },
        subjects: {
            self: {name: 'self', color: 'lightpink', text: 'Self'},
            shield: {name: 'shield', color: 'cyan', text:'((Shield))'},
            tree: {name: 'tree', color: 'lawngreen', text:'Tree'}
        }
        
    },

    room: {
        displayID: true,
        enemies: [],
        allies: [],
        colors: {},
        addAll(items) {
            $('#room_npc_table > tr').remove();
            $('#room_item_table > tr').remove();
            nexGui.room.npcs.guardCount = 0;
            nexGui.room.npcs.entityCount = 0;
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
            else {
                this.npcs.remove(item);
                this.items.remove(item);
            }
        },
        layout() {
            $('#tbl_2h1v1a').css({display:'flex','flex-direction':'column-reverse'})
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
            $(this.npcs.location).css({
                overflow:'auto',
                height:'100%'
            });
            $(this.items.location).css({
                overflow:'auto',
                height:'100%'
            });
            $(this.players.location).css({
                display:'flex',
                'flex-wrap':'wrap',
                overflow: 'auto',
                height: '100%'
            });
        }, 
        npcs: {
            font: 'veranda',
            size: '11px',
            idColor: 'cyan',
            nameColor: 'white',
            location: '#tbl_2h1v1b',
            guardCount: 0,
            entityCount: 0,
            add(npc) {
                if (npc.icon == 'guard' && npc.attrib == 'mx') {
                    this.addGuard(npc);
                    return;
                }
                if (npc.icon == 'fiend' && nexGui.mongo.ignoreList.some(rx => rx.test(npc.name))) {
                    this.addEntity(npc);
                    return;
                }
                let entry = $('<tr></tr>', {id: `npc-${npc.id}`, class:`${GMCP.Target == npc.id ? 'nexGui_room-target' : ''}`}).css({'font-size':this.size});
                $('<td></td>', {style:`padding: 0px 5px 0px 2px;color:${this.idColor}`}).html(nexGui.room.displayID?npc.id:"").appendTo(entry);
                $('<td></td>', {style:`color:${this.nameColor};padding:0px`}).html(npc.name).appendTo(entry);
                entry.on('click', (e) => {
                    send_direct(`settarget ${npc.id}`);
                    $(e.currentTarget).appendTo('#room_npc_table');
                })
                entry.appendTo('#room_npc_table');
            },
            remove(npc) {
                if (npc.icon == 'guard' && npc.attrib == 'mx' && this.guardCount > 0) {
                    this.guardCount--;
                    $('#npc-guardCount').html(`(${this.guardCount}x)`) 
                    return;
                }
                if (npc.icon == 'fiend' && nexGui.mongo.ignoreList.some(rx => rx.test(npc.name)) && this.entityCount > 0) {
                    this.entityCount--;
                    $('#npc-entityCount').html(`(${this.entityCount}x)`)
                }
                $(`#npc-${npc.id}`).remove();
                
            },
            target(id) {
                sdfg
            },
            addGuard(npc) {
                if (this.guardCount == 0) {
                    this.guardCount = 1;
                    let entry = $('<tr></tr>', {id: `npc-guards`});
                    $('<td></td>', {id: 'npc-guardCount', style:`padding: 0px;color:${this.idColor}`}).html(nexGui.room.displayID?`(${this.guardCount}x)`:"").appendTo(entry);
                    $('<td></td>', {style:`color:${this.nameColor};padding:0px`}).html('City Guards').appendTo(entry);
                    /*entry.on('click', (e) => {
                        send_direct(`settarget ${npc.id}`);
                        $(e.currentTarget).appendTo('#room_npc_table');
                    })*/
                    entry.appendTo('#room_npc_table');
                } else {
                    this.guardCount++
                    $('#npc-guardCount').html(`(${this.guardCount}x)`)
                    $('#npc-guards').appendTo('#room_npc_table');
                }
            },
            addEntity(npc) {
                if (this.entityCount == 0) {
                    this.entityCount = 1;
                    let entry = $('<tr></tr>', {id: `npc-entities`});
                    $('<td></td>', {id: 'npc-entityCount', style:`padding: 0px;color:${this.idColor}`}).html(nexGui.room.displayID?`(${this.entityCount}x)`:"").appendTo(entry);
                    $('<td></td>', {style:`color:${this.nameColor};padding:0px`}).html('Chaos Entities').appendTo(entry);
                    /*entry.on('click', (e) => {
                        send_direct(`settarget ${npc.id}`);
                        $(e.currentTarget).appendTo('#room_npc_table');
                    })*/
                    entry.appendTo('#room_npc_table');
                } else {
                    this.entityCount++
                    $('#npc-entityCount').html(`(${this.entityCount}x)`)
                    $('#npc-entities').appendTo('#room_npc_table');
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
                let c = false;
                let t = false;
                if (nexGui.colors.room[item.id]) {
                    c = nexGui.colors.room[item.id].color;
                    t = nexGui.colors.room[item.id].text;
                } else if (nexGui.colors.room[item.name]) {
                    c = nexGui.colors.room[item.name].color;
                    t = nexGui.colors.room[item.name].text;
                }
                
                let entry = $('<tr></tr>', {id: `item-${item.id}`}).css({'font-size':this.size});;
                $('<td></td>', {style:`color:${this.idColor}`}).html(nexGui.room.displayID?item.id:"").appendTo(entry);
                $('<td></td>', {style:`color:${c||this.nameColor}`}).html(`${t||item.name}`).appendTo(entry);

                if (c || t) {
                    entry.appendTo('#room_item_table');
                } else {
                    entry.prependTo('#room_item_table');
                }
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
                let entry = $('<div></div>', {id: `player-${player}`, class:`${GMCP.Target == player ? 'nexGui_room-target' : 'nexGui_room-player'}`})
                .css({
                    color: `${nexGui.colors.city[nexGui.cdb.players[player].city]||this.nameColor}`,
                    margin: '1px 5px 1px 5px',
                    padding: '2px',
                    'font-size': this.size,
                    height: '17px' // we set the height here because the container is a flexbox. The flexbox has height 100% so it will show the
                    // scrollbar at all times.
                })
                
                
                $('<span></span>', {class:'nexGui_room-player', 'data-player':player})
                .html(player)
                .hover((e)=>{nexGui.room.players.dialog(e.target.dataset.player)}, ()=>{$('#nexGui-dialog').dialog('destroy')})
                .appendTo(entry);
                
                let pre = false
                if (nexGui.room.enemies.indexOf(player) != -1) {
                    $('<span></span>', {style:'color:red'}).html('(').prependTo(entry);
                    $('<span></span>', {style:'color:red'}).html(')').appendTo(entry);
                    pre = true;
                } else if (nexGui.room.allies.indexOf(player) != -1) {
                    $('<span></span>', {style:'color:white'}).html('(').prependTo(entry);
                    $('<span></span>', {style:'color:white'}).html(')').appendTo(entry);
                    pre = true;
                }
                entry.on('click', () => {
                    send_direct(`settarget ${player}`);
                });
                
                if (pre)
                    entry.prependTo(this.location)
                else
                    entry.appendTo(this.location)
            },
            remove(player) {
                $(`#player-${player}`).remove();
            },
            dialog(player) {
                $('#nexGui-dialog').dialog('destroy')
                let c = nexGui.cdb.players[player];
                let d = $('<div id="nexGui-dialog"></div>')
                let t = $('<table></table>').appendTo(d);
                let k = Object.keys(c);
                for (let i = 0; i < k.length; i++) {
                    if (['regex','user'].indexOf(k[i]) != -1) {break;}
                    let r = $('<tr></tr>');
                    $('<td></td>').html(`${k[i].toProperCase()}: `).appendTo(r);
                    $('<td></td>').html(`${c[k[i]]}`).appendTo(r);
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
        members: [GMCP.Status.name],
        leader: GMCP.Status.name,
        targetCalls: true,
        affCalls: true,
        callTargets: false,
        callAffs: false,
        goldCollection: true,
        gagChat: false,
        
        removeMember(name) {
            console.log(" remove");
            $(`#party_list-${name}`).remove();
            nexGui.party.members.splice(nexGui.party.members.indexOf(name),1);
            $(`#leaderSelectList > option[value=${name}]`).remove();
        },
        
        addMember(name) {
            if (nexGui.party.members.indexOf(name) == -1) {
                nexGui.party.members.push(name);
            }
            
            $('<div></div>', {id: `party_list-${name}`})
                .append($("<span></span>").html(name).click(function() {removeMember(this);}))
                .appendTo($("#partyMemberList"));
            
            $("<option></option>", {value: name}).html(name).appendTo($("#leaderSelectList"));
        },
        
        updateMembers() {
            $('#partyMemberList').empty();
            $('#leaderSelectList').empty();
            this.members.forEach(e => this.addMember(e));
        },
        
        layout() {    	
            $('#partyDisplay').remove();
            let partyDisplay = $('<div></div>', {id: 'partyDisplay'})
                .css({
                    display:'flex',
                    'font-size': this.font_size,
                    'justify-content':'space-evenly'
                })
                .appendTo(this.location);
            $('<div></div>', {id: 'partyLeft'}).appendTo(partyDisplay);
            $('<div></div>', {id: 'partyRight'}).appendTo(partyDisplay);

            let leaderSelect = $("<div></div>", {id: "leaderSelector", style: "margin: 0 0 10px 0"});
            $("<p>Party Leader:  </p>", {}).appendTo(leaderSelect);
            let leaderSelectList = $("<select></select>", {name: "leaderSelect", id: "leaderSelectList"})
            .css({'font-size':this.font_size})
            .change(function() {
                console.log($(this).val());
                nexGui.party.leader = $(this).val();
            })
            .appendTo(leaderSelect);
            for (let i=0; i < nexGui.party.members.length; i++) {
                $("<option></option>", {value: nexGui.party.members[i]}).html(nexGui.party.members[i]).appendTo(leaderSelectList);
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
                .append($("<span></span>", {style: "text-decoration:underline;font-weight:bold"}).html("Party Members"))
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
        location: '#tbl_2h4b',
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
        month: 0,
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
                value: () => {
                    //client.get_variable('nexGui').stats;
                    return (GMCP.Status.gold - nexGui.stats.sessionGold).toLocaleString()
                }
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
                .append($("<span></span>", {style: "text-decoration:underline;font-weight:bold"}).html("Instance Stats"))
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
                .append($("<span></span>", {style: "text-decoration:underline;font-weight:bold"}).html("Session Stats"))
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
                $('<td></td>', {}).html(`${e.name}:`).appendTo(entry);
                $('<td></td>', {}).html(`${e.value()}`).appendTo(entry);
                entry.appendTo('#stats_instance_table');
            });
            this.sessionEntries.forEach(e => {
                let entry = $('<tr></tr>', {id: `stats_${e.id}`});
                $('<td></td>', {}).html(`${e.name}:`).appendTo(entry);
                $('<td></td>', {}).html(`${e.value()}`).appendTo(entry);
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
        ['WORLD', '32x'],
        ['PLANE', '64x']
        ],
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
            if (who.toLowerCase() == 'self') {color = nexGui.colors.subjects.self.color};

            return $("<div></div>").css({
               display:'table-cell',
                color: color
           }).html(who)
        },
        // There seems to be an industry guideline that you should not use HTML table for formatting purposes.
        // Rewrote this function to replicate the evenly spaced out display with divs.
        actionMsg(who = '', what = '', subject = '') {
            let lc_what = what.toLowerCase();
            let lc_subject = subject.toLowerCase();
            if (nexGui.colors.attacks[lc_what]) {
                this.attackMsg(who, what, subject);
                return;
            }
            
            let whatColor = false;
            let whatText = false;
            let subjectColor = false;
            let subjectText = false;
            if (nexGui.colors.actions[lc_what]) {
                whatColor = nexGui.colors.actions[lc_what].color;
                whatText = nexGui.colors.actions[lc_what].text;
            }
            if (nexGui.colors.subjects[lc_subject]) {
                subjectColor = nexGui.colors.subjects[lc_subject].color;
                subjectText = nexGui.colors.subjects[lc_subject].text;
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
            }).html('').appendTo(row);
            this.formatWho(who).appendTo(row)

            $('<div></div>').css({
                display:'table-cell',
                width: '30%',
                color: `${whatColor || ''}`
            }).html(`${whatText || what}`).appendTo(row);

            $("<div></div>").css({
                display:'table-cell',
                color: `${subjectColor || ''}`
            }).html(`${subjectText || subject}`).appendTo(row)

            nexPrint(tab[0].outerHTML);  
        },
        attackMsg(who, what, subject) {

            if(who.toLowerCase() == 'self') {
                this.attackMsgBrief(what, subject);
            }

            if (nexGui.msg.brief == true) { return; }

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
            }).html('').appendTo(row);
            this.formatWho(who).appendTo(row);
            
            let cellWhat = $('<div></div>').css({
                display:'table-cell',
                    width: '30%'
                }).appendTo(row);
            $('<span></span>', {style:"color:white"}).html('[').appendTo(cellWhat);
            $('<span></span>', {style:"color:orange"}).html(what.toProperCase()).appendTo(cellWhat);
            $('<span></span>', {style:"color:white"}).html(`]`).appendTo(cellWhat);
                
            
            if (subject.toLowerCase() == 'you') {
                $("<div></div>").css({
                    display:'table-cell',
                    color: 'cyan'
                }).html('Self').appendTo(row);
                nexPrint(tab[0].outerHTML); 
                return;
            }

            // Is the target a player?
            if(!nexGui.cdb.players[subject]) {
                // If the target is not a player then the attack could possibly crit.
                $('<span></span>', {style:"color:white"}).html(`:${this.checkCrit()}`).appendTo(cellWhat);

                // if the target matches our target we should know how much damage the attack did and the health of the target.
                if (subject.toLowerCase() == GMCP.TargetText.toLowerCase()) {
                    $('<span></span>', {style:"color:white"}).html('(').appendTo(cellWhat);
                    $('<span></span>', {style:'color:grey'}).html(`${GMCP.TargetHP?/*GMCP.TargetHP*/(GMCP.TargetHP_Change)+"%":''}`).appendTo(cellWhat);
                    $('<span></span>', {style:"color:white"}).html(')').appendTo(cellWhat);
                    
                    // Add the subject portion of the line.
                    let hpperc = parseInt(GMCP.TargetHP.slice(0,GMCP.TargetHP.length-1,1));
                    let cellSubject = $("<div></div>").css({
                        display:'table-cell'
                    })
                    $('<span></span>', {style:"color:white"}).html('(').appendTo(cellSubject);
                    $('<span></span>', {style:`color:${nexGui.colors.gradient(hpperc)}`}).html(`${GMCP.TargetHP?GMCP.TargetHP:' '}`).appendTo(cellSubject);
                    $('<span></span>', {style:"color:white"}).html(')').appendTo(cellSubject);
                    $('<span></span>', {style:'color:white'}).html(GMCP.TargetText).appendTo(cellSubject);
                    cellSubject.appendTo(row)                   
                } else {
                    let cellSubject = $("<div></div>").css({
                        display:'table-cell'
                    })
                    $('<span></span>', {style:"color:white"}).html('(').appendTo(cellSubject);
                    $('<span></span>').html('?%').appendTo(cellSubject);
                    $('<span></span>', {style:"color:white"}).html(')').appendTo(cellSubject);
                    $('<span></span>', {style:'color:white'}).html(subject).appendTo(cellSubject);
                    cellSubject.appendTo(row)                   
                }
            } else {
                this.formatWho(subject).appendTo(row)
            }

            nexPrint(tab[0].outerHTML);  
        },
        attackMsgBrief(what, subject) {
            let cellWhat = $('<span></span>', {class:"mono"})
            $('<span></span>', {style:"color:white"}).html('[').appendTo(cellWhat);
            $('<span></span>', {style:"color:orange"}).html(what).appendTo(cellWhat);
            $('<span></span>', {style:"color:white"}).html(`]`).appendTo(cellWhat);

            let cellSubject = $('<span></span>', {class:"mono"})
            // Is the target a player?
            if(!nexGui.cdb.players[subject]) {
                // If the target is not a player then the attack could possibly crit.
                $('<span></span>', {style:"color:white"}).html(`:${this.checkCrit()}`).appendTo(cellWhat);

                // if the target matches our target we should know how much damage the attack did and the health of the target.
                if (subject.toLowerCase() == GMCP.TargetText.toLowerCase()) {                 
                    // Add the subject portion of the line.
                    let hpperc = parseInt(GMCP.TargetHP.slice(0,GMCP.TargetHP.length-1,1));                   
                    $('<span></span>', {style:"color:white"}).html('(').appendTo(cellSubject);
                    $('<span></span>', {style:`color:${nexGui.colors.gradient(hpperc)}`}).html(`${GMCP.TargetHP ? GMCP.TargetHP : ' '}`).appendTo(cellSubject);
                    $('<span></span>', {style:"color:white"}).html(')').appendTo(cellSubject);                   
                } else {
                    cellSubject.html('');
                }
            }

            nexGui.stream.write('#nexGuiAttackStream', [cellWhat,cellSubject]);  
        }
    },

    pvp: {
        location: '#tbl_2h3c',
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
            $('<caption></caption>', {style: 'text-decoration:underline;font-weight:bold'}).html('Class').appendTo(toggleTableLeft);
            $('<th></th>', {style:"width:auto"}).appendTo(toggleTableLeft);
            $('<th></th>', {style:"width:auto"}).appendTo(toggleTableLeft);
    
            let toggleTableRight = $('<table></table>', {
                id: 'pvpToggleTableRight',
                'font-size':'11px',
                'text-align':'left',
                //'table-layout':'fixed',
                'max-width':'100%',
                'border-spacing':'0px'})
            $('<caption></caption>', {style: 'text-decoration:underline;font-weight:bold'}).html('Defences').appendTo(toggleTableRight);
            $('<th></th>', {style:"width:auto"}).appendTo(toggleTableRight);
            $('<th></th>', {style:"width:auto"}).appendTo(toggleTableRight);
    
            toggleTableLeft.appendTo(pvpLeft);
            toggleTableRight.appendTo(pvpRight);

            //This will push the class tab to the front most active position
            $('#container_2h4b > div').tabs('option', 'active', client.display_tabs['container_2h4b'].indexOf('2h4b'))
        }
    },

    optionsPane: {
        location: '#tbl_2h4c2',
        font_size: '11px',
        layout() {  
            // Split the pane into two halves.
            $('#optionsDisplay').remove();
            $('#optionsLeft').empty();
            $('#optionsRight').empty();
            let optionsDisplay = $('<div></div>', {id: 'optionsDisplay', style:`display:flex;justify-content:space-evenly;font-size:${this.font_size}`}).appendTo(this.location);
            let optionsLeft = $('<div></div>', {id: 'optionsLeft'}).appendTo(optionsDisplay);
            let optionsRight = $('<div></div>', {id: 'optionsRight'}).appendTo(optionsDisplay);        
    
            // Table for holding all of our pvp toggles
            let toggleTableLeft = $('<table></table>', {
                id: 'optionsToggleTableLeft',
                'font-size':'11px',
                'text-align':'left',
                //'table-layout':'fixed',
                'max-width':'100%',
                'border-spacing':'0px'})
            $('<caption></caption>', {style: 'text-decoration:underline;font-weight:bold'}).html('Nexus Config').appendTo(toggleTableLeft);
            $('<th></th>', {style:"width:auto"}).appendTo(toggleTableLeft);
            $('<th></th>', {style:"width:auto"}).appendTo(toggleTableLeft);
    
            let toggleTableRight = $('<table></table>', {
                id: 'optionsToggleTableRight',
                'font-size':'11px',
                'text-align':'left',
                //'table-layout':'fixed',
                'max-width':'100%',
                'border-spacing':'0px'})
            $('<caption></caption>', {style: 'text-decoration:underline;font-weight:bold'}).html('nexGui Config').appendTo(toggleTableRight);
            $('<th></th>', {style:"width:auto"}).appendTo(toggleTableRight);
            $('<th></th>', {style:"width:auto"}).appendTo(toggleTableRight);
    
            toggleTableLeft.appendTo(optionsLeft);
            toggleTableRight.appendTo(optionsRight);

            nexGui.addOption('#optionsToggleTableLeft', 'Echo Input', client.echo_input);
            nexGui.addOption('#optionsToggleTableLeft', 'Single Prompt', client.gag_prompts);
            nexGui.addOption('#optionsToggleTableLeft', 'Display GMCP', client.echo_gmcp);
            nexGui.addOption('#optionsToggleTableLeft', 'Display Timestamps', client.show_timestamps);
            // First we clear out any potential duplicate event listeners. (just in case)
            nexSys.eventStream.removeListener('nexGui-option-EchoInput', 'echoinputToggle');
            nexSys.eventStream.removeListener('nexGui-option-SinglePrompt', 'singlepromptToggle');
            nexSys.eventStream.removeListener('nexGui-option-DisplayGMCP', 'displaygmcpToggle');
            nexSys.eventStream.removeListener('nexGui-option-DisplayTimestamps', 'displaytimestampsToggle');
            // Now we add a listener with a simple function to execute when a toggle is changed. 
            //In these cases it reads the true false value and changes the defence priority between 25 and 0
            nexSys.eventStream.registerEvent('nexGui-option-EchoInput', function echoinputToggle(tf) {client.echo_input = tf ? true : false});
            nexSys.eventStream.registerEvent('nexGui-option-SinglePrompt', function singlepromptToggle(tf) {client.gag_prompts = tf ? true : false});
            nexSys.eventStream.registerEvent('nexGui-option-DisplayGMCP', function displaygmcpToggle(tf) {client.echo_gmcp = tf ? true : false});
            nexSys.eventStream.registerEvent('nexGui-option-DisplayTimestamps', function displaytimestampsToggle(tf) {client.show_timestamps = tf ? true : false});

            let nexusFontSizeSelect = $("<tr></tr>", {id: "nexusFontSizeSelect"}).appendTo('#optionsToggleTableLeft');
            $("<td>Font Size</td>", {}).appendTo(nexusFontSizeSelect);
            let cell = $("<td></td>", {}).appendTo(nexusFontSizeSelect);
            let fontSizeSelectList = $("<select></select>", {name: "nexusFontSizeSelectList", id: "nexusFontSizeSelectList"})
            .change(function() {
                client.font_size = parseInt($(this).val());
                client.redraw_interface()
            })
            .appendTo(cell);
            $("<option></option>", {value: 7}).html(7).appendTo(fontSizeSelectList);
            $("<option></option>", {value: 8}).html(8).appendTo(fontSizeSelectList);
            $("<option></option>", {value: 9}).html(9).appendTo(fontSizeSelectList);
            $("<option></option>", {value: 10}).html(10).appendTo(fontSizeSelectList);
            $("<option></option>", {value: 11}).html(11).appendTo(fontSizeSelectList);
            $("<option></option>", {value: 12}).html(12).appendTo(fontSizeSelectList);
            $("<option></option>", {value: 13}).html(13).appendTo(fontSizeSelectList);
            $("<option></option>", {value: 14}).html(14).appendTo(fontSizeSelectList);
            $("<option></option>", {value: 15}).html(15).appendTo(fontSizeSelectList);
            $('#nexusFontSizeSelectList').val(client.font_size);


            nexGui.addOption('#optionsToggleTableRight', 'Stream', reflex_find_by_name("group", "nexGui.stream", false, false, "nexGui").enabled);
            nexGui.addOption('#optionsToggleTableRight', 'Msg Replace', reflex_find_by_name("group", "nexGui.msg", false, false, "nexGui").enabled);
            // First we clear out any potential duplicate event listeners. (just in case)
            nexSys.eventStream.removeListener('nexGui-option-Stream', 'nexGuiStreamToggle');
            nexSys.eventStream.removeListener('nexGui-option-MsgReplace', 'nexGuiMsgToggle');
            // Now we add a listener with a simple function to execute when a toggle is changed. 
            //In these cases it reads the true false value and changes the defence priority between 25 and 0
            nexSys.eventStream.registerEvent('nexGui-option-Stream', function nexGuiStreamToggle(tf) {reflex_find_by_name("group", "nexGui.stream", false, false, "nexGui").enabled = tf});
            nexSys.eventStream.registerEvent('nexGui-option-MsgReplace', function nexGuiMsgToggle(tf) {reflex_find_by_name("group", "nexGui.msg", false, false, "nexGui").enabled = tf});
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
                .append($("<span></span>", {style: "text-decoration:underline;font-weight:bold;text-align:center"}).html("Missing Defs"))
                .appendTo(this.location);
        },
        add(def) {
            
            if (this.keepup.indexOf(def) == -1) {return;}
            def = def.replace("(",'').replace(")",'').replaceAll(" ",'-');
            let d = $('<div></div>', {id: `def-${def}`})
            .css({
                color: this.font_color,
                'font-size': this.font_size,
                //'background-color': this.background_color,
                background: 'radial-gradient(white, black)',
                'border-radius': '10px',
                width: '100%',
                'text-align': 'center',
                'font-weight': '700',
                opacity: '80%',
                'text-shadow':'2px 1px lightpink',
                margin: '2px 0px 0px 0px'
            })
            .html(def.toProperCase())
            d.appendTo(this.location);
        },
        remove(def) {
            def = def.replace("(",'').replace(")",'').replaceAll(" ",'-');
            $(`#def-${def}`).remove();
        },
        update() {
            this.layout();
            this.keepup.filter(x => Object.keys(GMCP.Defences).indexOf(x)==-1)
                .forEach(e=>this.add(e));
        }       
    },

    timer: {
        location: '#tbl_5b',
        font_size: '12px',
        font_color: 'white',
        animations: {
            gaugeFill: [
                {transform: 'scaleX(0)'},
                {transform: 'scaleX(1)'}
            ],
            
            gaugeColorRG: [
                {background:'crimson'},
                {background:'red'},
                {background:'orange'},
                {background:'yellow'},
                {background:'green'}
            ],
            /*
            gaugeColorRG: [
                {background: 'linear-gradient(black, crimson, silver)'},
                {background: 'linear-gradient(black, red, silver)'},
                {background: 'linear-gradient(black, orange, silver)'},
                {background: 'linear-gradient(black, yellow, silver)'},
                {background: 'linear-gradient(black, green, silver)'}
            ],
            */
            gaugeEmpty: [
                {transform: 'scaleX(1)'},
                {transform: 'scaleX(0)'}
            ],
            gaugeColorGR: [
                {background:'green'},
                {background:'yellow'},
                {background:'orange'},
                {background:'red'},
                {background:'crimson'}
            ],
        },
        timers: {},
        Timer: class Timer {
            constructor(id, label, duration=0, style='grow', location='#nexTimerTableTop') {
                this._id = id;
                this._label = label;
                this._duration = duration;
                this._style = style;
                this._location = location;
                this.addTimer();
                this._target = document.getElementById(`${this._id}-gauge`);
                this._interval = {};
                if(style == 'grow') {
                    this._animationScale = this._target.animate(nexGui.timer.animations.gaugeFill, {
                        duration:this._duration*1000, 
                        easing:'linear', 
                        fill:'forwards', 
                        composite: 'replace'
                    });
                    this._animationColor = this._target.animate(nexGui.timer.animations.gaugeColorRG, {
                        duration:this._duration*1000, 
                        easing:'linear', 
                        fill:'forwards', 
                        composite: 'replace'
                    });
                    this._animationScale.onfinish = function() {
                        clearInterval(this._interval);
                        $(`#${this._id}-text`).html(this._duration);
                    }.bind(this);
                } else {
                    this._animationScale = this._target.animate(nexGui.timer.animations.gaugeEmpty, {
                        duration:this._duration*1000, 
                        easing:'linear', 
                        fill:'forwards', 
                        composite: 'replace'
                    });
                    this._animationColor = this._target.animate(nexGui.timer.animations.gaugeColorGR, {
                        duration:this._duration*1000, 
                        easing:'linear', 
                        fill:'forwards', 
                        composite: 'replace'
                    });
                    this._animationScale.onfinish = function() {
                        clearInterval(this._interval);
                        $(`#${this._id}-text`).html(0);
                    }.bind(this);
                }
                this.stop();
            }
            get target() {return this._target;}
            get interval() {return this._interval;}
            set target(id) {this._target = document.getElementById(`${id}-gauge`);}
            addTimer() {
                let row = $('<div></div>', {id: `${this._id}-timer`,class: "nexGuiTimerContainer"}).appendTo(this._location)
                $('<div></div>', {id: `${this._id}-gauge`, class: "nexGuiTimerGauge"}).appendTo(row);
                $('<div></div>', {class: "nexGuiTimerLabel"}).html(this._label).appendTo(row);
                $('<div></div>', {id: `${this._id}-text`, class: "nexGuiTimerText"}).html(this._duration).appendTo(row);                
            }
            start() {
                this._animationScale.cancel();
                this._animationColor.cancel();
                this._animationScale.play();
                this._animationColor.play();

                clearInterval(this._interval);
                this._interval = setInterval(function() {$(`#${this._id}-text`).html(parseFloat(this._duration-this._animationScale.currentTime/1000).toFixed(1));}.bind(this),100);
            }
            stop() {
                this._animationScale.finish();
                this._animationColor.finish();
            }
        },
        add(id, label, duration = 0, style = 'grow', location='#nexTimerTableTop') {
            if (this.timers[id]) {
                clearInterval(this.timers[id]._interval);
                delete this.timers[id];
                $(`#${id}-timer`).remove();
            }            
            
            this.timers[id] = new this.Timer(id, label, duration, style, location);           
        },
        layout() {
            $(this.location).empty();
            $(this.location).css({
                display: 'flex',
                'flex-direction': 'column',
                height: '100%'
            });
            $('<div></div>', {id:"nexTimerTable"}).css({
                display: 'flex',
                'flex-direction': 'column',
                'justify-content': 'space-between',
                height: '100%'
            }).appendTo(this.location);
            $('<div></div>', {style: 'text-decoration:underline;font-weight:bold;text-align:center'}).html('Timers').prependTo(this.location);
            let timerTop = $('<div></div>', {id: 'nexTimerTableTop'}).css({
                'font-size': this.font_size,
                color: this.font_color,
                display: 'flex',
                'flex-direction':'column',
                'width': '100%',
                'text-shadow':'-2px -1px black'
            });

            let timerBot = $('<div></div>', {id: 'nexTimerTableBot'}).css({
                'font-size': this.font_size,
                color: this.font_color,
                display: 'flex',
                'flex-direction':'column',
                'width': '100%',
                'text-shadow':'2px 1px black'
            })
            
            timerTop.appendTo('#nexTimerTable');
            timerBot.appendTo('#nexTimerTable');
        }
        /*addORIGINAL(id, label, duration = 0) {
            let row = $('<tr></tr>').appendTo('#nexTimerTable');
            $('<div></div>', {id:`${id}Timer-gauge`}).css({
                position:'absolute',
                width: '100%',
                height: `13px`,
                background: 'green'
            }).appendTo(row)
            $('<td></td>').css({
                padding:'0px 5px 0px 0px',
                display:'block',
                'font-weight':'bold',
                'font-size':`${this.font_size}`
            }).html(label).appendTo(row);
            $('<td></td>', {id: `${id}Timer`, class: "nexGui_timer"}).css({
                padding:'0px 5px 0px 0px',
                width:'4ch',
                'text-align':'right',
                display:'block'
        }).html(0).appendTo(row)
                   
            this[id] = {
                id: id,
                duration: duration+1,
                start() {$(`#${id}Timer`).html(this.duration)}
            }
        },
        
        remove(id) {
            $(`#${id}Timer`).remove();
            delete this[id];
        },*/
        
        /*layoutORIGINAL() {
            $(this.location).empty();
            // Table for holding all of our timers.
            let timerTable = $('<table></table>', {
                id: 'nexTimerTable',
                'font-size': this.font_size,
                'text-align':'left',
                //'table-layout':'fixed',
                'width': 'auto',
                'max-width':'100%',
                'border-spacing':'0px'
            })
            $('<caption></caption>', {style: 'text-decoration:underline;font-weight:bold'}).html('Timers').appendTo(timerTable);
            $('<th></th>', {style:"width:auto"}).appendTo(timerTable);
            $('<th></th>', {style:"width:4ch"}).appendTo(timerTable);
            
            timerTable.appendTo(this.location);
            this._start();
        }*/
    },

    feed: {
        url: 'https://api.achaea.com/gamefeed.json',
        location: '#tbl_2h4a',
        font_size: '11px',
        lastEntry: false,
        interval: 5000,
        _timer: {},
        _start() {
            console.log(`nexGui.feed._start() called. Timer now running at ${this.interval/1000} second interval`);
            this._stop();
            this._timer = setInterval(nexGui.feed.fetch, this.interval);
        },
        _stop() {clearInterval(this._timer)},
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
            this._start();
        },
        fetch() {
            $.getJSON( nexGui.feed.url, function(data) {
                if(!nexGui.feed.lastEntry) {
                    nexGui.feed.lastEntry = data[24];
                }
                nexGui.feed.add(data);
            });
            /* I originally thought I could use something like this to increase the
               efficiency of the inline name highlighting, but limiting the regex
               check to only names that were online. This would obviously then stop 
               from highlighting names that were used in conversation but not online
               "That guy Khaseem is so awesome."
            $.getJSON( 'https://api.achaea.com/characters.json', function(data) {
                nexGui.feed.characters = data;
            });
            */
        },
        add(data) {
            let index = data.findIndex(e=>e.id == this.lastEntry.id);
            if (index == 24) {return}
            for(let i = index+1; i < 25; i++) {
                let entry = $('<div></div>', {class: 'nexGui_feed'}).css({'font-size':this.font_size})
                $('<span></span>', {class: "timestamp"}).css({color:'grey'}).html(client.getTimeNoMS()+" ").appendTo(entry)
                $('<span></span>').append(nexGui.colors.highlightNames(data[i].description)).appendTo(entry)
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
        streamLocation: '#tbl_2h3b',
        attackLocation: '#tbl_2h3a',
        font_size: '11px',
        msgLimit: 100,
        write(location, msg, timeFormat = 'noms') {
            let row = $('<div></div>', {style:"display:table-row"}).appendTo(location);

            if (timeFormat == 'noms') {
                $('<div></div>', {class: "timestamp"}).css({display: 'table-cell', padding: '0px 5px 0px 0px'}).html(client.getTimeNoMS()+" ").appendTo(row);
            } else {
                $('<div></div>', {class: "timestamp"}).css({display: 'table-cell', padding: '0px 5px 0px 0px'}).html(client.getTime('ms')+" ").appendTo(row);
            }
            if (!Array.isArray(msg)) {
                msg = [msg];
            }

            msg.forEach(e => {
                $('<div></div>').css({display: 'table-cell', padding: '0px 5px 0px 0px'})
                .append(e)
                .appendTo(row);
            })

            if ($(location).children().length > this.msgLimit) {
                $(location).children()[0].remove()
            }

            $(location).parent().scrollTop($(location)[0].scrollHeight)
        },
        layout() {
            $(this.streamLocation).empty();
            $(this.streamLocation).css({
                overflow: 'auto',
                height: '100%'
            });
            $('<div></div>', {id:"nexGuiStream"})
                .css({
                    'font-size':this.font_size,
                    'line-height':'13px'
                })
                .appendTo(this.streamLocation);
            $(this.attackLocation).empty();
            $(this.attackLocation).css({
                overflow: 'auto',
                height: '100%'
            });
            $('<div></div>', {id:"nexGuiAttackStream"})
                .css({
                    'font-size':this.font_size,
                    'line-height':'13px'
                })
                .appendTo(this.attackLocation);
            let nexGuiStreamAddAff = function nexGuiStreamAddAff(aff) {
                if (['blindness', 'deafness', 'insomnia'].indexOf(aff.name) != -1) {return;}
                nexGui.stream.write('#nexGuiStream', ["<span class='mono' style='color:crimson'>+aff&nbsp&nbsp&nbsp</span>",`<span>${aff.name.toProperCase()}</span>`], 'ms');
            }
            let nexGuiStreamAddDef = function nexGuiStreamAddDef(def) {
                nexGui.stream.write('#nexGuiStream', ["<span class='mono' style='color:lawngreen'>+def&nbsp&nbsp&nbsp</span>",`<span>${def.name.toProperCase()}</span>`], 'ms');
            }
            let nexGuiStreamLostAff = function nexGuiStreamLostAff(aff) {
                if (['blindness', 'deafness', 'insomnia'].indexOf(aff[0]) != -1) {return;}
                nexGui.stream.write('#nexGuiStream', ["<span class='mono' style='color:lawngreen'>-aff&nbsp&nbsp&nbsp</span>",`<span>${aff[0].toProperCase()}</span>`], 'ms');
            }
            let nexGuiStreamLostDef = function nexGuiStreamLostDef(def) {
                nexGui.stream.write('#nexGuiStream', ["<span class='mono' style='color:crimson'>-def&nbsp&nbsp&nbsp</span>",`<span>${def[0].toProperCase()}</span>`], 'ms');
            }
            nexSys.eventStream.removeListener('Char.Defences.Remove', 'nexGuiStreamLostDef');
            nexSys.eventStream.removeListener('Char.Defences.Add', 'nexGuiStreamAddDef');
            nexSys.eventStream.removeListener('Char.Afflictions.Remove', 'nexGuiStreamLostAff');
            nexSys.eventStream.removeListener('Char.Afflictions.Add', 'nexGuiStreamAddAff');
            nexSys.eventStream.registerEvent('Char.Defences.Remove', nexGuiStreamLostDef);
            nexSys.eventStream.registerEvent('Char.Defences.Add', nexGuiStreamAddDef);
            nexSys.eventStream.registerEvent('Char.Afflictions.Remove', nexGuiStreamLostAff);
            nexSys.eventStream.registerEvent('Char.Afflictions.Add', nexGuiStreamAddAff);
        }
    },

    self: {
        font_size: '11px',
        location: '#tbl_5c',
        wielded: {
            left: {},
            right: {},
            display() {
                let wielded = $('<div></div>').css({'display':'flex'})
                n
            }
        },

        layout() {
            $(this.location).empty();
            $(this.location).css('font-size', this.font_size);
            let title = $('<div></div>').css({
                'width': '100%',
                'text-align': 'center',
                'font-size': '13px'
            }).appendTo(this.location);
            $("<span></span>", {style: "text-decoration:underline;font-weight:bold;text-align:center"})
            .html("Self State")
            .appendTo(title)
            
        },
    },

    aff: {
        location: '#tbl_5c',
        font_size: '11px',
        layout() {
            $(this.location).empty();
            $('<div></div>')
                .css({
                    'width': '100%',
                    'font-size': '13px',
                    'text-align': 'center'
                })
                .append($("<span></span>", {style: "text-decoration:underline;font-weight:bold;text-align:center"}).html("Afflictions"))
                .appendTo(this.location);
        },
        add(aff) {
            if (['blindness', 'deafness', 'insomnia'].indexOf(aff) != -1) {return;}

            aff = aff.replace('(','').replace(')','').replace(' ', '-');

            let a = $('<div></div>', {id: `aff-${aff}`})
            .css({
                color: this.font_color,
                'font-size': this.font_size,
                //'background-color': this.background_color,
                width: '100%',
                'text-align': 'center',
                //'font-weight': 'bold',
                //opacity: '60%',
                margin: '2px 0px 0px 0px'
            })
            .html(aff.toProperCase())
            a.appendTo(this.location);
        },
        remove(aff) {
            aff = aff.replace('(','').replace(')','').replace(' ', '-');
            $(`#aff-${aff}`).remove();
        },
        update(affs) {
            this.layout();
            affs.forEach(e=>{nexGui.aff.add(e.name)})
        }
        
    },

    target: {
        font_size: '11px',
        location: '#tbl_5d',
        
        layout() {
            $(this.location).empty();
            $(this.location).css('font-size', this.font_size);
            
            let title = $('<div></div>').css({
                'width': '100%',
                'text-align': 'center',
                'font-size': '13px'
            }).appendTo(this.location);
            $("<span></span>", {style: "text-decoration:underline;font-weight:bold;text-align:center"})
            .html("Target State")
            .appendTo(title);
        }
    
    },

    cdb: {
        players: {},
        async gmcpChannelPlayers(args) {
            for(let i = 0; i < args.length; i++) {
                if (!this.players[args[i].name]) {
                    await this.getCharacterByName(args[i].name);
                }
            }
        },
        async getCharacterServerList() {
            let result = await fetch("https://api.achaea.com/characters.json", {cache: 'no-store'});
            if(!result.ok) { 
                console.log('getCharacterServerList() error');
                return; 
            }
            let data = await result.json();
            for (let i = 0; i < data.characters.length; i++) {
                await nexGui.cdb.getCharacterByURI(data.characters[i].uri, data.name);
            }
        },
        async addCharacterToMongo(data) {
            data.time = client.Date();
            data.user = GMCP.Status.name;
            data.level = parseInt(data.level);
            data.player_kills = parseInt(data.player_kills);
            data.xp_rank = parseInt(data.xp_rank);
            data.explorer_rank = parseInt(data.explorer_rank);

            if (this.players[data.name]) {
                if (data.city == "(hidden)" || data.city == "(none)") {
                    data.city = this.players[data.name].city;
                }
                await nexGui.mongo.db.updateOne({'name':data.name}, data);
                console.log(`nexGui.cdb.addCharacterToMongo(${data.name}) updateOne.`)
            } else {
                await nexGui.mongo.db.insertOne(data);
                console.log(`nexGui.cdb.addCharacterToMongo(${data.name}) insertOne.`)
            }
            nexGui.cdb.players[data.name] = data;
            nexGui.cdb.players[data.name].regex = new RegExp('\\b'+data.name+'\\b', 'g');
        },

        async getCharacterByURI(uri, name) {
            let result = await fetch(uri, {cache: 'no-store'});
            
            if (!result.ok) {
                await nexGui.mongo.db.deleteOne({'name':name});
                console.log(`nexGui.cdb.getCharacterByName(${name}) failed. Entry deleted from database.`);
                return;
            }

            let data = await result.json();
            await nexGui.cdb.addCharacterToMongo(data);
        },
        
        async getCharacterByName(name) {
            let result = await fetch("https://api.achaea.com/characters/" + name.toLowerCase() + ".json", {cache: 'no-store'});
            
            if (!result.ok) {
                await nexGui.mongo.db.deleteOne({'name':name});
                console.log(`nexGui.cdb.getCharacterByName(${name}) failed. Entry deleted from database.`);
                return;
            }

            let data = await result.json();
            await nexGui.cdb.addCharacterToMongo(data);
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
        },

        _purgeRemovedPlayers() {
            var purgeList = Object.keys(this.players);
            var purgeTimer = setInterval(()=> {
                if(purgeList.length == 0) {console.log('No names left, clearing interval');clearInterval(purgeTimer)}
                let name = purgeList.pop();
                console.log(name);
                nexGui.cdb.getCharacterByName(name)
            }, 1000)
        }
    },

    mongo: {
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
            this.db = this.mongodb.db('nexCDB').collection('characters');
            let entries = await this.db.find({}, {projection: {name:1, fullname:1, city:1, house:1, level:1, class:1, mob_kills:1, player_kills:1, xp_rank:1, explorer_rank:1, time:1, _id:0}});
            entries.forEach(e=>{
                nexGui.cdb.players[e.name]=e;
                nexGui.cdb.players[e.name].regex=new RegExp('\\b'+e.name+'\\b', 'g');
            });
            await nexGui.cdb.getCharacterServerList();
            console.log('MongoDB loaded');
            nexGui.notice(`GUI version ${nexGui.version} loaded and ready for use.`);
            nexGui.notice(`Player database loaded with ${entries.length} entries.`);
            nexGui.notice(`Current Nexus package dated: 2021-11-18.`);
            nexGui.notice('<span>Download the latest self-updating package (<a style="color:white; text-decoration:underline" target="_blank" href="https://drive.google.com/file/d/1032lTwNMWDTsfy_8tprBvsPCi7FYukKL/view?usp=sharing">HERE</a>)</span>');
        },
        ignoreList: [
            /a dervish/,
        ]
    },

    aliases: {
        call(alias, args = false) {
            if (!Object.keys(nexGui.aliases).includes(alias)) {
                nexGui.notice(`"ng  ${alias}" is not a valid command.`);
                return;
            }
    
            nexGui.aliases[alias](args);
        },
        load() {            
            client.reflex_enable(reflex_find_by_name("group", "nexGui.colors", false, false, "Nexgui"));
            client.reflex_enable(reflex_find_by_name("group", "nexGui.stream", false, false, "Nexgui"));

            nexGui.startUp();
        },
        resize(args) {
            args = args.split(" ");
            if (Number.isInteger(parseInt(args[0])) && Number.isInteger(parseInt(args[1]))) {
                nexGui.resize(parseInt(args[0]), parseInt(args[1]));
            } else {
                console.log('invalid numbers')
            }
        },
        whois(name) {
            nexGui.room.players.dialog(name.toProperCase());
        },
        restore() {
            nexGui.generateStyle();
            nexGui.restoreLayout();
        },
        theme1() {
            nexGui.themes.fireflies();
        },
        theme2() {
            nexGui.themes.moonSmall();
        },
        theme3() {
            nexGui.themes.moonMain();
        },
        theme4() {
            nexGui.themes.birds();
        },
        summary() {
            let cmds = [
                {
                    cmd: 'ng load',
                    txt: 'Initial load of the GUI.',
                },
                {
                    cmd: 'ng resize # #',
                    txt: 'Resizes the 3 main columns of the GUI. Mainly for laptop users. The numbers provided are a percentage of the width. Example "ng resize 8 50".'
                },
                {
                    cmd: 'ng restore',
                    txt: 'Restores the display to base settings.'
                },
                {
                    cmd: 'ng whois (name)',
                    txt: 'Displays player database information for a character.'
                },
                {
                    cmd: 'ng theme1',
                    txt: 'Dark woods with fireflies theme.'
                },
                {
                    cmd: 'ng theme2',
                    txt: 'Night sky theme.'
                },
                {
                    cmd: 'ng theme3',
                    txt: 'Night sky in the main window'
                },
                {
                    cmd: 'ng theme4',
                    txt: 'Day time forest with birds.'
                },
            ];
        
            let tab = $("<table></table>", {
                class: "mono",
                style: "max-width:100%;border:1px solid GoldenRod;border-spacing:2px"
            });
            let header = $("<tr></tr>", {
                style: "text-align:left;color:Ivory"
            }).appendTo(tab);
            $("<th></th>", {
                style: 'width:10em'
            }).html('Command').appendTo(header);
            $("<th></th>", {
                style: 'width:auto'
            }).html('Summary').appendTo(header);
        
            for (let x in cmds) {
                let row = $("<tr></tr>", {
                    style: 'color:dimgrey;border-top: 1px solid GoldenRod;border-bottom: 1px solid GoldenRod;'
                }).appendTo(tab);
                $("<td></td>", {
                    style: 'color:grey'
                }).html(cmds[x].cmd).appendTo(row);
                $("<td></td>", {
                    style: 'color:grey;'
                }).html(cmds[x].txt).appendTo(row);
            }
            nexGui.notice('Aliases for user interaction');
            print(tab[0].outerHTML);
        }
    }
}

$.getScript("https://unpkg.com/realm-web/dist/bundle.iife.js", ()=>{console.log('nexGui.mongo.startUp() called from onLoad');nexGui.mongo.startUp();});  
$.getScript('https://cdn.jsdelivr.net/gh/Log-Wall/nexGui/nexusRewrites.js');
$.getScript('https://cdn.jsdelivr.net/gh/Log-Wall/nexGui/nexGui.themes.js');

fetch('https://cdn.jsdelivr.net/gh/Log-Wall/nexGui/nexGui.nxs', {cache: "no-store"})
    .then(response => {
        response.json()
            .then(data => {
                console.log(data);
                //packages[packages.findIndex(e=>e.name=='nexgui')] = data;
            })
    });

let dependencies = ['jsHelpers', 'eventStream', 'gmcpHandler', 'customTabs']
dependencies.forEach(e=> run_function(e, {}, 'Nexgui'))               

let customizations = ['colors', 'occultist', 'magi', 'bluedragon', 'greendragon']
customizations.forEach(e=> run_function(`nexGui.${e}`, {}, 'Nexgui'))

gmcp_save_system(false)