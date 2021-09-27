'use strict'

var nexGui = {
    room: {
        displayID: true,
        enemies: [],
        classBalance: true,
        classBalanceType: 'Entity', // This is from GMCP.CharStats or GMCP.Char.Vitals
        highlightNames(txt) {
            let names = Object.keys(cdb.regex);
            for(let i = 0; i < names.length; i++) {
                if (txt.indexOf(names[i]) != -1 && typeof cdb.characterServerList[names[i]] != 'undefined') {
                    txt = txt.replace(cdb.regex[names[i]], `<span style="color:${cdb.city_colours[cdb.characterServerList[names[i]].city]}">${names[i]}</span>`)
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
            if (item?.attrib == "m" || item?.attrib == "mx" || item?.attrib == "mdt")
                this.npcs.remove(item);
            else
                this.items.remove(item);
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
                let entry = $('<tr></tr>', {id: `npc-${npc.id}`});
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
                let entry = $('<tr></tr>', {id: `item-${item.id}`});
                $('<td></td>', {style:`color:${this.idColor}`}).text(nexGui.room.displayID?item.id:"").appendTo(entry);
                $('<td></td>', {style:`color:${this.nameColor}`}).text(item.name).appendTo(entry);
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
                let entry = $('<div></div>', {id: `player-${player}`, class:`nexGui_room-player${GMCP.Target == player ? ' nexGui_room-target' : ''}`})
                    .css({
                        color: `${cdb.city_colours[cdb.characterServerList[player].city]||this.nameColor}`,
                        margin: '0px 10px 0px 0px'
                    })
                    .text(player)
                
                if (nexGui.room.enemies.indexOf(player) != -1) {
                    $('<span></span>', {style:"padding:0px 5px 0px 0px"})
                        .append($('<span></span>', {style:'color:white'}).text('['))
                        .append($('<span></span>', {style:'color:red'}).text('E'))
                        .append($('<span></span>', {style:'color:white'}).text(']'))
                        .prependTo(entry);
                }
                entry.appendTo(this.location)
            },
            remove(player) {
                $(`#player-${player}`).remove();
            }
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
        
        removeMember(args) {
            console.log(" remove");
            $(`#party_list-${name}`).remove();
            nexGui.party.party.splice(nexGui.party.party.indexOf($(args).text()),1);
            $('select[name="leaderSelect"]>[value='+$(args).text()+']').remove();
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
            $('<table></table>', {id: 'partyOptionsTable'}).appendTo('#partyRight');
            
            let addOption = function(title, option) {
                let optionRow = $('<tr></tr>');
                $('<td></td>', {style: "padding:0px 5px 0px 0px;display:block;font-weight:bold"}).text(title).appendTo(optionRow);

                let lab = $('<label></label>', {
                    'class': 'nexswitch nexInput'
                });
                $('<input></input>', {
                    type: "checkbox",
                    'class': 'nexbox nexInput'
                })
                    .prop('checked', option)
                    .on('change', function () {
                        option = $(this).prop('checked');
                    })
                    .appendTo(lab);
                $('<span></span>', {
                    'class': 'nexslider nexInput'
                }).appendTo(lab);
                $('<td></td>').css({'vertical-align':'middle'}).append(lab).appendTo(optionRow);
                optionRow.appendTo('#partyOptionsTable');
            }
        }
    },

    bash: {
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
                value: () => {return  nexGui.bash.instanceCount}
            },
            {
                id: 'instanceGold',
                name: 'Total Gold', 
                value: () => {return (GMCP.Status.gold - nexGui.bash.instanceGold).toLocaleString()}
            },
            {
                id: 'instanceTime',
                name: 'Time', 
                value: () => {
                    let t = (performance.now() - nexGui.bash.instanceTime) / 1000;
                    let m = parseInt(t / 60);
                    let s = parseInt(t % 60);
                    return `${m > 1 ? m+"m" : ''} ${s}s`
                }
            },
            {
                id: 'instanceGoldPerHr',
                name: 'Gold/Hr', 
                value: () => {
                    let t = (performance.now() - nexGui.bash.instanceTime) / 1000;
                    let h = (t / 3600);
                    let gh = (GMCP.Status.gold - nexGui.bash.instanceGold) / h;
                    return parseInt(gh).toLocaleString()
                }
            },
        ],
        sessionEntries: [
            {
                id: 'sessionKills',
                name: 'Total Kills', 
                value: () => {return  nexGui.bash.sessionCount}
            },
            {
                id: 'sessionGold',
                name: 'Total Gold', 
                value: () => {return (GMCP.Status.gold - nexGui.bash.sessionGold).toLocaleString()}
            },
            {
                id: 'sessionTime',
                name: 'Time', 
                value: () => {
                    let t = (performance.now() - nexGui.bash.sessionTime) / 1000;
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
                    let t = (performance.now() - nexGui.bash.sessionTime) / 1000;
                    let h = (t / 3600);
                    let gh = (GMCP.Status.gold - nexGui.bash.sessionGold) / h;
                    return parseInt(gh).toLocaleString()
                }
            },
            {
                id: 'sessionXP',
                name: 'Total XP', 
                value: () => {
                    return `${parseInt(GMCP.Status.xp.replace('%','')) - nexGui.bash.sessionXP}%`;
                }
            },
            {
                id: 'sessionDeaths',
                name: 'Deaths', 
                value: () => {
                    return nexGui.bash.sessionDeaths;
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
            $('#basherDisplay').remove();
            let basherDisplay = $('<div></div>', {id: 'basherDisplay', style:`display:flex;justify-content:space-evenly;font-size:${this.font_size}`}).appendTo(nexGui.bash.location);
            let basherLeft = $('<div></div>', {id: 'basherLeft'}).appendTo(basherDisplay);
            let basherRight = $('<div></div>', {id: 'basherRight'}).appendTo(basherDisplay);
    
            $('#bashing_instance_table').remove();
             $('<p></p>')
                .append($("<span></span>", {style: "text-decoration:underline;font-weight:bold"}).text("Instance Stats"))
                .appendTo('#basherLeft');
            $("<table></table>", {
                id: "bashing_instance_table",
            }).css({
                'font-size':nexGui.bash.font_size,
                'text-align':'left',
                //'table-layout':'fixed',
                'max-width':'100%',
                'border-spacing':'0px'
            }).appendTo(basherLeft);
            $('<th></th>', {style:"width:auto"}).appendTo('#bashing_instance_table');
            $('<th></th>', {style:"width:auto"}).appendTo('#bashing_instance_table');
            $('#bashing_instance_table').appendTo('#basherLeft');
            
            $('<input></input>', {type:'submit', value:'Reset'})
                .on('click', ()=>{nexGui.bash.reset()}).appendTo('#basherLeft');
            
            $('#bashing_session_table').remove();
             $('<p></p>')
                .append($("<span></span>", {style: "text-decoration:underline;font-weight:bold"}).text("Session Stats"))
                .appendTo('#basherRight');
            $("<table></table>", {
                id: "bashing_session_table",
            }).css({
                'font-size':nexGui.bash.font_size,
                'text-align':'left',
                //'table-layout':'fixed',
                'max-width':'100%',
                'border-spacing':'0px'
            }).appendTo(basherLeft);
            $('<th></th>', {style:"width:auto"}).appendTo('#bashing_session_table');
            $('<th></th>', {style:"width:auto"}).appendTo('#bashing_session_table');
            $('#bashing_session_table').appendTo('#basherRight');
            
            this.update();
            
        },
        update() {
            $('#bashing_instance_table tr').remove();
            $('#bashing_session_table tr').remove();
            this.instanceEntries.forEach(e => {
                let entry = $('<tr></tr>', {id: `basher_${e.id}`});
                $('<td></td>', {}).text(`${e.name}:`).appendTo(entry);
                $('<td></td>', {}).text(`${e.value()}`).appendTo(entry);
                entry.appendTo('#bashing_instance_table');
            });
            this.sessionEntries.forEach(e => {
                let entry = $('<tr></tr>', {id: `basher_${e.id}`});
                $('<td></td>', {}).text(`${e.name}:`).appendTo(entry);
                $('<td></td>', {}).text(`${e.value()}`).appendTo(entry);
                entry.appendTo('#bashing_session_table');
            });
        }
    },

    msg: {
        crits: [
        ['a CRITICAL', '2x'],
        ['CRUSHING', '4x'],
        ['OBLITERATING', '8x'],
        ['ANNIHILATINGLY', '16x'],
        ['WORLD', '32x']
        ],
        checkCrit() {
            let dmg = 'Hit';
            for(let i = 0; i < this.crits.length; i++) {
                let block = current_block[current_block.indexOf(current_line)+1];
                if (typeof block.line === 'undefined') {
                    break;
                }
                let line = block.line;
    
                //print(`${line} ${crits[i][0]} ${line.indexOf(crits[i][0])}`);
                if (line && line.indexOf(this.crits[i][0]) > 0) {
                    dmg = this.crits[i][1];
                    break;
                }
            }
            return dmg;
        },
         actionMsg1(who, what, subject) {
             let hpperc = parseInt(GMCP.TargetHP.slice(0,GMCP.TargetHP.length-1,1));
             let hpcolor = '';
             if (hpperc > 75) {
                 hpcolor = 'limegreen';
             } else if (hpperc > 50) {
                 hpcolor = 'yellow';
             } else if (hpperc > 20) {
                 hpcolor = 'orange';
             } else if (hpperc >= 0) {
                 hpcolor = 'red';
             } else {
                 hpcolor = 'white';
             }
            
             let tab = $("<table></table>", {class: "mono"})
                 .css({
                    display: 'inline-table',
                    "text-align": "left",
                    "table-layout": "fixed",
                    "max-width": "90%",
                    "border-spacing": "0px",
                    'vertical-align': 'middle',
                    
                });
             let row = $("<tr></tr>").appendTo(tab)
             $("<td></td>", {style: 'width:100px'}).text('').appendTo(row)
             $("<td></td>").text(who).css({color: 'white', width: '100px'}).appendTo(row)
             $('<td></td>')
                 .append($('<span></span>', {style:"color:white"}).text('['))
                 .append($('<span></span>', {style:"color:orange"}).text(what))
                 .append($('<span></span>', {style:"color:white"}).text(`]:${this.checkCrit()}`))
                 .append($('<span></span>', {style:"color:white"}).text('('))
                 .append($('<span></span>', {style:'color:grey'}).text(`${GMCP.TargetHP?/*GMCP.TargetHP*/(GMCP.TargetHP_Change)+"%":''}`))
                 .append($('<span></span>', {style:"color:white"}).text(')'))
                 .appendTo(row);
             $("<td></td>")
                 .append($('<span></span>', {style:"color:white"}).text('('))
                 .append($('<span></span>', {style:`color:${hpcolor}`}).text(`${GMCP.TargetHP?GMCP.TargetHP:'DEAD'}`))
                 .append($('<span></span>', {style:"color:white"}).text(')'))
                 .append($('<span></span>', {style:'color:white'}).text(subject)).appendTo(row)
             //.append($("<td></td>").text(''))
    
             print(tab[0].outerHTML, true);
             //ow_Write('#test_stream', tab[0].outerHTML);
        },
        // There seems to be an industry guideline that you should not use HTML table for formatting purposes.
        // This is an alternate function to replicate the evenly spaced out display with divs.
        actionMsg(who, what, subject) {
             let hpperc = parseInt(GMCP.TargetHP.slice(0,GMCP.TargetHP.length-1,1));
             let hpcolor = '';
             if (hpperc > 75) {
                 hpcolor = 'limegreen';
             } else if (hpperc > 50) {
                 hpcolor = 'yellow';
             } else if (hpperc > 20) {
                 hpcolor = 'orange';
             } else if (hpperc >= 0) {
                 hpcolor = 'red';
             } else {
                 hpcolor = 'white';
             }
            
             let tab = $("<div></div>", {class: "mono"}).css({
                  display:'inline-table',
                 'width': 'calc(100% - 14ch)',
                 'text-align': 'left',
                 'table-layout': 'fixed'
             });
             let row = $("<div></div>")
                 .css({
                    display:'table-row'
                })
                 .appendTo(tab)
             $("<div></div>")
                 .css({
                    display:'table-cell',
                     width: '10%'
                })
                 .text('')
                 .appendTo(row)
             $("<div></div>")
                 .css({
                    display:'table-cell',
                     width: '20%',
                     color: 'white'
                })
                 .text(who)
                 .appendTo(row)
             $('<div></div>')
                .css({
                    display:'table-cell',
                     width: '35%'
                })
                 .append($('<span></span>', {style:"color:white"}).text('['))
                 .append($('<span></span>', {style:"color:orange"}).text(what))
                 .append($('<span></span>', {style:"color:white"}).text(`]:${this.checkCrit()}`))
                 .append($('<span></span>', {style:"color:white"}).text('('))
                 .append($('<span></span>', {style:'color:grey'}).text(`${GMCP.TargetHP?/*GMCP.TargetHP*/(GMCP.TargetHP_Change)+"%":''}`))
                 .append($('<span></span>', {style:"color:white"}).text(')'))
                 .appendTo(row);
             $("<div></div>")
                .css({
                    display:'table-cell'
                })
                 .append($('<span></span>', {style:"color:white"}).text('('))
                 .append($('<span></span>', {style:`color:${hpcolor}`}).text(`${GMCP.TargetHP?GMCP.TargetHP:'DEAD'}`))
                 .append($('<span></span>', {style:"color:white"}).text(')'))
                 .append($('<span></span>', {style:'color:white'}).text(subject)).appendTo(row)
    
             print(tab[0].outerHTML, true);
             //ow_Write('#test_stream', tab[0].outerHTML);
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
            let toggleTable = $('<table></table>', {
                id: 'pvpToggleTable',
                'font-size':'11px',
                'text-align':'left',
                //'table-layout':'fixed',
                'max-width':'100%',
                'border-spacing':'0px'})
            $('<caption></caption>', {style: 'text-decoration:underline;font-weight:bold'}).text('Class').appendTo(toggleTable);
            $('<th></th>', {style:"width:auto"}).appendTo(toggleTable);
            $('<th></th>', {style:"width:auto"}).appendTo(toggleTable);
            
            let toggleTable2 = $('<table></table>', {
                id: 'pvpToggleTable',
                'font-size':'11px',
                'text-align':'left',
                //'table-layout':'fixed',
                'max-width':'100%',
                'border-spacing':'0px'})
            $('<caption></caption>', {style: 'text-decoration:underline;font-weight:bold'}).text('Defences').appendTo(toggleTable2);
            $('<th></th>', {style:"width:auto"}).appendTo(toggleTable2);
            $('<th></th>', {style:"width:auto"}).appendTo(toggleTable2);
            
            let addOption = function(container, title, option, ref) {
                let optionRow = $('<tr></tr>');
                $('<td></td>', {style: `padding:0px 5px 0px 0px;display:block;font-weight:bold;font-size:${this.font_size}`}).text(title).appendTo(optionRow);
    
                let lab = $('<label></label>', {
                    'class': 'nexswitch nexInput'
                });
                $('<input></input>', {
                    type: "checkbox",
                    'class': 'nexbox nexInput'
                })
                    .prop('checked', option)
                    .on('change', function () {
                    option = $(this).prop('checked');
                })
                    .appendTo(lab);
                $('<span></span>', {
                    'class': 'nexslider nexInput'
                }).appendTo(lab);
                $('<td></td>').append(lab).appendTo(optionRow);
                optionRow.appendTo(container);
            }
    
            addOption(toggleTable, 'Tentacles', true);
            addOption(toggleTable, 'Firelash', true);
            addOption(toggleTable, 'Sun Tarot', false);
            addOption(toggleTable, 'Dopple', false);
            
            addOption(toggleTable2, 'Mass', false);
            addOption(toggleTable2, 'Rebounding', false);
            addOption(toggleTable2, 'Hold Breath', false);
            addOption(toggleTable2, 'Tunnelvision', true);
            
            let prioritySelect = $("<p></p>", {id: "pvpPrioritySelect"});
            $("<p>Aff Priority:  </p>", {}).appendTo(prioritySelect);
            let pvpPrioritySelectList = $("<select></select>", {name: "pvpPrioritySelect", id: "pvpPrioritySelectList"})
            .change(function() {
                console.log($(this).val());
            })
            .appendTo(prioritySelect);
            $("<option></option>", {value: 'Enlighten'}).text('Enlighten').appendTo(pvpPrioritySelectList);
            $("<option></option>", {value: 'Truename'}).text('Truename').appendTo(pvpPrioritySelectList);
            $("<option></option>", {value: 'Damage'}).text('Damage').appendTo(pvpPrioritySelectList);
            $("<option></option>", {value: 'Aeon'}).text('Aeon').appendTo(pvpPrioritySelectList);
    
    
            /////////////////////////////////////////////////////////////////////////////////////////
            // Populate the LEFT side column of the pane
            toggleTable.appendTo('#pvpLeft');
            prioritySelect.appendTo('#pvpLeft');
            pvpPrioritySelectList.appendTo('#pvpLeft');
            
            toggleTable2.appendTo('#pvpRight');
        }
    },

    def: {
        location: '#tbl_5a',
        font_size: '12px',
        font_color: 'red',
        background_color: 'pink',
        keepup: [
            'blindness', 
            'boartattoo', 
            'cloak', 
            'deafness', 
            'deathsight',
            'dragonarmour',
            'dragonbreath', 
            'fangbarrier', 
            'insomnia', 
            'insulation', 
            'kola', 
            'levitating', 
            'megalithtattoo', 
            'mindseye',
            'moontattoo',
            'mosstattoo',
            'nightsight',
            'oxtattoo',
            'selfishness',
            'speed',
            'starburst',
            'temperance',
            'thirdeye'
                ],
        dragon: [],
        occultist: [],
        airlord: [],
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
            console.log(def);
            console.log(typeof def);
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
                margin: '2px'
            })
            .text(def.toProperCase())
            d.appendTo(this.location);
            console.log(this.location);
        },
        remove(def) {
            $(`#def-${def}`).remove();
        }
        
    },

    timer: {
        location: '#tbl_5b',
        font_size: '11px',
        timer: {},
        start() {
            this.timer = setInterval(nexGui.timer.callBack, 1000);
        },
        stop() {clearInterval(this.timer)},
        callBack() {
            console.log('nexTimer timer');
            $('.nexTimer').each(function() {
                let num = parseInt($(this).text());
                if (num == 0) {return};
                num--;
                $(this).text(num);
            });
        },
        add(id, label) {
            $('<tr></tr>')
                    .append($('<td></td>', {style: `padding:0px 5px 0px 0px;display:block;font-weight:bold;font-size:${this.font_size}`}).text(label))
                    .append($('<td></td>', {id: `${id}Timer`, class: "nexGui_timer", style: "padding:0px 5px 0px 0px"}).text(0))
                    .appendTo('#nexTimerTable');
        },
        remove(id) {
            $(`#${id}Timer`).remove();
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
            
            //nexGui.timer.add("id", "Label")
            this.add('tree', 'Tree Tattoo');
            this.add('tentacles', 'Tentacles');
            this.add('arctar', 'Arctar Orb');
            this.add('fool', 'Fool');
            this.add('sunTick', 'Sun Tick');
            this.add('sunOrb', 'Sun Orb');
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
    
    }
}