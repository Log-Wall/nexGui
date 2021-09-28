client.write_channel = function(command,message,talker) {
    // disabling these checks, as we want the text to be added even if the channel is hidden right now, as long as it exists
//    if (!client.channels_enabled()) return;
//    var i = is_channel_open(command);
//    if (i !== false)

    // Appending to the channel as long as the tab exists at all, even if it is hidden or whatever.
    if (command  == "says" && talker.indexOf(" ") != -1) {return;}
    if ($("#channel_" + command).length > 0)
    {
        try {
            message = nexGui.room.highlightNames(message);//nexGui
            ow_Write("#channel_" + command, message)
            client.channel_new_indicator(command);
        } catch (e) { }
    }

    if ($("#channel_all").length > 0) {
        message = nexGui.room.highlightNames(message); //nexGui
        ow_Write("#channel_all", `${client.getTimeNoMS()} ${message}`);
        client.channel_new_indicator('all');
    }
}

client.handle_GMCP = function(data)
{
    var gmcp_fire_event = false;
    var gmcp_event_param = '';

    if (data.GMCP)
    {
        if (client.echo_gmcp)
            print('[GMCP]: ' + data.GMCP.method + ' ' + data.GMCP.args, client.color_gmcpecho);

        var gmcp_method = data.GMCP.method;
        var gmcp_args = data.GMCP.args;
        if (gmcp_args.length == 0) gmcp_args = "\"\"";  // because JSON can't handle an empty string
        gmcp_args = JSON.parse(gmcp_args);
		
        switch (gmcp_method) {
            case "Core.Goodbye":
                client.disconnect_reason = gmcp_args;
                //cm_alert(gmcp_args, {title:"Connection Closed"});
                break;

            case "Core.Ping":
                if (GMCP.PingStart)
                    GMCP.PingTime = new Date().getTime() - GMCP.PingStart;
                GMCP.PingStart = null;
                break;

            case "Char.Name":
                GMCP.Character = gmcp_args;
                logged_in = true;

                // Set the window title //
                document.title = GMCP.Character.name + " - " + game;

                $("#character_module_name").html(GMCP.Character.name);

                request_avatar();

                setTimeout(function () {
                    if (client.load_settings)
                        gmcp_import_system();
                }, 1000);
                break;

            case "Char.StatusVars":
                GMCP.StatusVars = gmcp_args;
                break;

            case "Char.Status":
                // the data can be partial, so don't replace what we have
                if (GMCP.Status == null) GMCP.Status = {};
                var s = gmcp_args;
                for (v in s)
                    GMCP.Status[v] = s[v];
                var status = GMCP.Status;
                client.draw_affdef_tab();
                break;

            case "Char.Vitals":
                // Handled by each game's character_module.php include
                if (gmcp_args.charstats) {
                    GMCP.CharStats = gmcp_args.charstats;
                    client.update_affdef_stats();
                }
                /** nexGUI we don't need the voting button
                var vote_display = gmcp_args.vote ? 'block' : 'none';
                if (vote_display != $('#vote').css('display')) {
                    $('#vote').css('display', vote_display);
                    relayout_status_bar();
                }
				**/
                GMCP.gauge_data = gmcp_args;
                // put all the info to variables
                for (v in gmcp_args)
                {
                    if (v == 'charstats') continue;
                    client.set_variable('my_'+v, gmcp_args[v]);
                }

                parse_gauges(gmcp_args);
                if (client.game == 'Lusternia') parse_lusternia_wounds(gmcp_args);

                gmcp_fire_event = true;
                gmcp_event_param = '';
                break;

            case "Char.Skills.Groups":
                $("#tbl_skills").html("<table><tbody></tbody></table>");
                var skills = $("#tbl_skills tbody");

                for (var i in gmcp_args)
                {
                    skills.append("<tr><td class=\"skill_group\" style=\"padding: 1px; font-weight:bolder;\" group=\"" + gmcp_args[i].name + "\">" + gmcp_args[i].name + "&nbsp;</td><td style=\"padding: 1px;\">" + gmcp_args[i].rank + "</td></tr>");
                }

                $("#tbl_skills tr").css("cursor","pointer").click(function() {
                    send_GMCP("Char.Skills.Get", {"group":$(this).find('.skill_group').attr("group")});
                    GMCP.WaitingForSkills = true;
                });
                break;

            case "Char.Skills.List":
                if (GMCP.WaitingForSkills == true)
                {
                    var dsl = $("<div/>");

                    var div = "<div id=\"group_skills\" class=\"\" title=\"Abilities in " + ucfirst(gmcp_args.group) + "\" style=\"font-size:.8em;\">";

                    div += '<table id="skill_listing">';
                    for (var i = 0; i < gmcp_args.list.length; ++i)
                    {
                        var desc = '';
                        if (gmcp_args.descs && (gmcp_args.descs.length > i)) desc = gmcp_args.descs[i];
                        div += "<tr class=\"skill_name\" group=\"" + gmcp_args.group + "\" skill=\"" + gmcp_args.list[i] + "\"><td>" + gmcp_args.list[i] + "</td><td>" + desc + '</td></tr>';
                    }
                    div += '</table>';

                    dsl.append(div).find(".skill_name").click(function() {
                        send_GMCP("Char.Skills.Get", {"group":$(this).attr("group"), "name":$(this).attr("skill")});
                    });

                    cm_dialog("#", {id: "skill_list", top_align: 40, title: "Abilities in " + ucfirst(gmcp_args.group), width: ($("#container").width() * .4), height: ($("#container").height() * .5), content: dsl});

                    GMCP.WaitingForSkills = false;
                }
                break;

            case "Char.Skills.Info":
                var dsl = $("<div/>");

                var div = "<div id=\"group_skills_skill\" class=\"\" title=\"" + ucfirst(gmcp_args.skill) + "\" style=\"font-size:.8em;\">";

                if(gmcp_args.info != "")
                {
                    div += "<p>" + client.escape_html(gmcp_args.info).replace(/\n/g,"<br />") + "</p>";
                } else {

                    div += "<p>You have not yet learned that ability.</p>";

                }

                dsl.append(div);

                cm_dialog("#", {id: "skill_info", top_align: 40, title: ucfirst(gmcp_args.skill), width: ($("#container").width() * .5), height: ($("#container").height() * .5), content: dsl});
                break;

            case "Char.Afflictions.List":
                GMCP.Afflictions = {};
                for (var i = 0; i < gmcp_args.length; ++i) {
                    var aff = gmcp_args[i];  // this has keys: name, cure, desc
                    GMCP.Afflictions[aff.name] = aff;
                }
                client.draw_affdef_tab();
                break;

            case "Char.Afflictions.Add":
                var aff = gmcp_args;
                GMCP.Afflictions[aff.name] = aff;
                client.draw_affdef_tab();

                gmcp_fire_event = true;
                gmcp_event_param = aff;
                break;

            case "Char.Afflictions.Remove":
                for (var i = 0; i < gmcp_args.length; ++i)
                delete GMCP.Afflictions[gmcp_args[i]];
                client.draw_affdef_tab();

                gmcp_fire_event = true;
                gmcp_event_param = aff;
                break;

            case "Char.Defences.List":
                GMCP.Defences = {};
                for (var i = 0; i < gmcp_args.length; ++i) {
                    var def = gmcp_args[i];  // this has keys: name, desc
                    GMCP.Defences[def.name] = def;
                }
                client.draw_affdef_tab();
                break;

            case "Char.Defences.Add":
                var def = gmcp_args;
                GMCP.Defences[def.name] = def;
                client.draw_affdef_tab();

                gmcp_fire_event = true;
                gmcp_event_param = def;
                break;

            case "Char.Defences.Remove":
                for (var i = 0; i < gmcp_args.length; ++i)
                delete GMCP.Defences[gmcp_args[i]];
                client.draw_affdef_tab();

                gmcp_fire_event = true;
                gmcp_event_param = def;
                break;

// We are handling all of the room Player/NPC/Item displays ourself in nexGui.
/*
            case "Room.AddPlayer":
                if (gmcp_args.name != GMCP.Character.name)
                {
                    var name = gmcp_args.name.toLowerCase();
                    $("#div_room_players #" + name).remove();  // because the remove msg sometimes isn't sent
                    $("#div_room_players").append("<p class=\"no_border item\" id=\"" + name + "\"><span class=\"item_icon\"></span><span class=\"player_name\">" + gmcp_args.fullname + "</span></p>");
                
                    gmcp_fire_event = true;
                    gmcp_event_param = gmcp_args.name;
                }
                break;

            case "Room.RemovePlayer":
                var name = gmcp_args.toLowerCase();
                $("#div_room_players #" + name).remove();
                gmcp_fire_event = true;
                gmcp_event_param = gmcp_args;
                break;

            case "Room.Players":
                setTimeout(function () {
                    $("#div_room_players").html("");

                    for (var i in gmcp_args)
                    {
                        if (gmcp_args[i].name.toLowerCase() != GMCP.Character.name.toLowerCase()) {
                            var html = "<p class=\"no_border item\" id=\"" + gmcp_args[i].name.toLowerCase() + "\"><span class=\"item_icon\"></span><span class=\"player_name\">" + gmcp_args[i].fullname + '</span>';
                            html += "</p>";
                            $("#div_room_players").append(html);
                        }
                    }
                }, 0);
                break;

            case "Char.Items.Add":
                var div_id = itemlist_divid(gmcp_args.location, gmcp_args.item);
                if (div_id == null) return;
                $(div_id).append(itemlist_entry(gmcp_args.item));
                itemlist_events(gmcp_args.item);
                update_item_visibility();
                break;

            case "Char.Items.Update":
                var div_id = itemlist_divid(gmcp_args.location, gmcp_args.item);
                if (div_id == null) return;

                var orig = $(div_id + " #" + gmcp_args.item.id);
                var orig_crosstype = $("#div_inventory #" + gmcp_args.item.id);
                // if the item moves to another tab, remove it from the original one
                if (orig_crosstype.length > orig.length)
                {
                    orig_crosstype.remove();
                    crossbuttons = true;
                    orig = new Array();
                }
                // hide buttons, but remember that they existed, if they did
                var buttons = $("#div_inventory .buttons_" + gmcp_args.item.id);
                buttons.remove();

                var newtext = itemlist_entry(gmcp_args.item);
                if (orig.length)
                    orig.replaceWith(newtext);
                else
                    $(div_id).append(newtext);
                itemlist_events(gmcp_args.item);

                // if the buttons were shown, show them again
                // we go with this hide-show thing because the item could have moved from one list to another
                var room = (gmcp_args.location == "room");
                var parentid = room ? "#container_room_contents" : "#tab_content_inventory";
                if (buttons.length)
                    item_button_click($(parentid + " #" + gmcp_args.item.id), !room);
                update_item_visibility();
                break;

            case "Char.Items.Remove":
                if (typeof gmcp_args.item.id != "undefined")
                    temp_item_id = gmcp_args.item.id;
                else
                    temp_item_id = gmcp_args.item;

                if (gmcp_args.location == "room")
                {
                    div_id = "#container_room_contents";

                    $(div_id + " #" + temp_item_id).remove();
                    $(div_id + " .buttons_" + temp_item_id).remove();
                } else
                {
                    $("#div_inventory #" + temp_item_id).remove();
                    $("#div_inventory .buttons_" + temp_item_id).remove();
                }
                break;

            case "Char.Items.List":
                setTimeout(function () {
                    if (gmcp_args.location == "room")
                        $("#div_room_items, #div_room_mobs").html("");
                    else if (gmcp_args.location == "inv")
                        $("#div_inventory").html('<div class="subsection"><div class="heading">Wielded</div><div class="section_content" id="div_inv_wielded"></div></div><div class="hrule"></div><div class="subsection"><div class="heading">Worn</div><div class="section_content" id="div_inv_worn"></div></div><div class="hrule"></div><div class="subsection"><div class="heading">Other</div><div class="section_content" id="div_inv_items"></div></div>');
                    else if (gmcp_args.location.substr(0, 3) == "rep") {
                        var id = gmcp_args.location.substr(3);
                        var container = "div_inv_container" + id;
                        $("#"+container).remove();

                        $("#" + id + " > .fa.fa-plus-circle").removeClass("fa-plus-circle").addClass("fa-minus-circle");
                        $("#" + id + ", .buttons_" + id).addClass('open_container');
                        // if buttons exist, display the container after them
                        var after = $(".buttons_" + id);
                        if (after.length == 0) after = $("#" + id);
                        after.after("<div id=\"" + container + "\" class=\"item-container open_container\"></div>");
                    }

                    for (var i in gmcp_args.items)
                    {
                        var div_id = itemlist_divid(gmcp_args.location, gmcp_args.items[i]);
                        if (div_id == null) continue;
                        $(div_id).append(itemlist_entry(gmcp_args.items[i]));
                        itemlist_events(gmcp_args.items[i]);
                    }
                    update_item_visibility();
                }, 0);
                break;
*/
            case "Redirect.Content":
                var name = gmcp_args.name;
                if (!name) name = 'Information';
                var type = gmcp_args.type;
                if (!type) type = 'text';
                var windowid = gmcp_args.windowid;
                if (!windowid) windowid = type;
                var id = 'content_window_' + windowid;
                var width = parseInt(gmcp_args.width);
                if (isNaN(width)) width = 0;
                var height = parseInt(gmcp_args.height);
                if (isNaN(height)) height = 0;
                var content = gmcp_args.content;

                client.create_content_window (id, name, type, content, width, height);
                break;

            case "Redirect.Content.Close":
                var windowid = gmcp_args;
                if (!windowid) return;
                var id = 'content_window_' + windowid;
                client.close_content_window (id);
                break;

            case "IRE.Display.Help":
                if (client.popups_help === true) {
                    var res = {};
                    res.display_help = true;
                    res.start = (gmcp_args == "start");
                    return res;
                }
                break;

            case "IRE.Display.Window":
                if (client.popups_help === true) {
                    var res = {};
                    res.display_window = true;
                    res.start = (parseInt(gmcp_args.start) == 1);
                    res.cmd = gmcp_args.cmd;
                    return res;
                }
                break;

            case "IRE.Display.FixedFont":
                var res = {};
                res.display_fixed_font = true;
                res.start = (gmcp_args == "start");
                return res;
                break;

            case "IRE.Display.AutoFill":
                $("#user_input").val(gmcp_args.command);

                if (gmcp_args.highlight && (gmcp_args.highlight === true || gmcp_args.highlight == "true"))
                    document.getElementById("user_input").setSelectionRange(0,document.getElementById("user_input").value.length);

                $("#user_input").focus();
                break;

            case "IRE.Display.HidePopup":
                $("#" + gmcp_args.id).fadeOut({
                    complete: function () {$(this).remove()}
                });
                break;

            case "IRE.Display.HideAllPopups":
                $(".popup").fadeOut({
                    complete: function () {$(this).remove()}
                });
                break;

            case "IRE.Display.Popup":
                //{"id":"test","src":"/games/images/arrow-down-animated.gif","element":"#user_input","options":{}}

                var id = gmcp_args.id,
                    element = gmcp_args.element,
                    src = gmcp_args.src,
                    content = $("<p/>").html(gmcp_args.text),
                    options = gmcp_args.options,
                    commands = gmcp_args.commands,
                    allow_noshow = gmcp_args.allow_noshow;

                //print(gmcp_method + ":<br/>" + JSON.stringify(gmcp_args));

                client.display_gmcp_popup(id, element, src, content, options, commands, allow_noshow);
                break;

            case "IRE.Display.Ohmap":
                if (client.map_enabled()) {
                    var res = {};
                    res.ohmap = true;
                    res.start = (gmcp_args == "start");
                    return res;
                }
                break;

            case "IRE.Display.ButtonActions":
                bottom_buttons_set_defaults(gmcp_args);
                break;

            case "Comm.Channel.Start":
                var res = {};
                res.channel = gmcp_args;
                res.start = true;
                return res;
                break;

            case "Comm.Channel.End":
                var res = {};
                res.channel = gmcp_args;
                res.start = false;
                return res;
                break;

            case "Comm.Channel.Text":
                var channel = gmcp_args.channel;
                var text = gmcp_args.text;
                var talker = gmcp_args.talker;
                text = parse_and_format_line(text);
                write_channel(channel, text, talker);
                notifications_channel_text(channel, text, talker);
                break;

            case "Comm.Channel.List":
                GMCP.ChannelList = gmcp_args;

                setTimeout(function() {
                    $("#div_channels").html("");

                    for (var i in GMCP.ChannelList)
                    {
                        $("#div_channels").append("<p class=\"no_border item\" style=\"padding: 5px; cursor:pointer\" name=\"" + GMCP.ChannelList[i].name + "\" caption=\"" + GMCP.ChannelList[i].caption + "\" command=\"" + GMCP.ChannelList[i].command + "\">" + ucfirst(GMCP.ChannelList[i].caption) + "</p>");
                    }

                    $("#div_channels > .item").click(function() {
                        if ($(this).hasClass("bg_medium")) clear = true; else clear = false;

                        $("#div_channels > .item").removeClass("bg_medium");
                        $("#div_channels > .buttons").remove();

                        if (!clear)
                        {
                            $(this).addClass("bg_medium");

                            var name = $(this).attr("name");
                            var caption = $(this).attr("caption");
                            var command = $(this).attr("command");

                            $(this).after("<p class=\"buttons txt_center\" style=\"font-size: .9em;\">" +
                                            "<button class=\"open_channel\" name=\"" + name + "\" caption=\"" + caption + "\" command=\"" + command + "\">Open Channel</button>" +
                                        "</p>");
                            $("#div_channels > .buttons > button.open_channel").button().click(function() {open_channel($(this).attr("name"),$(this).attr("caption"),$(this).attr("command"));});
                        }
                    });
                },0);
                break;
// Not using the who list stuff with nexGui
/*
            case "Comm.Channel.Players":
                setTimeout(function () {
                    GMCP.WhoList = gmcp_args;

                    GMCP.WhoList.sort(function (a,b) {
                        if (a.name < b.name)
                            return -1;
                        if (a.name > b.name)
                            return 1;
                        return 0;
                    });

                    $("#div_who_channels").html("<p class=\"no_border bg_medium who_channel\" style=\"padding: 5px; cursor:pointer\">All Players</p>");
                    $("#div_who_players").html("");

                    var channels = [];

                    for (var i in GMCP.WhoList)
                    {
                        if (GMCP.WhoList[i].channels)
                        {
                            for (var j in GMCP.WhoList[i].channels)
                            {
                                if ($.inArray(GMCP.WhoList[i].channels[j], channels) == -1)
                                    channels.push(GMCP.WhoList[i].channels[j])
                            }
                        }

                        $("#div_who_players").append("<p class=\"no_border who_name\" style=\"padding: 2px 5px; cursor:pointer\">" + GMCP.WhoList[i].name + "</p>");
                    }

                    $("#div_who_players > .who_name").click(function() {
                        var name = $(this).html();
                        send_direct('honours ' + name);
                    });

                    channels.sort();

                    for (var i in channels)
                    {
                        $("#div_who_channels").append("<p class=\"no_border who_channel\" style=\"padding: 5px; cursor:pointer\" who_channel=\"" + channels[i] + "\">" + ucfirst(channels[i]) + "</p>");
                    }

                    $("#div_who_channels > .who_channel").click(function() {

                        if ($(this).hasClass("bg_medium")) clear = true; else clear = false;

                        $("#div_who_channels > .who_channel").removeClass("bg_medium");

                        $(this).addClass("bg_medium");

                        $("#div_who_players").html("");

                        for (var i in GMCP.WhoList)
                        {
                            if ($(this).html() == "All Players" || (GMCP.WhoList[i].channels && $.inArray($(this).attr("who_channel"), GMCP.WhoList[i].channels) > -1))
                            {
                                $("#div_who_players").append("<p class=\"no_border who_name\" style=\"padding: 2px 5px; cursor:pointer\">" + GMCP.WhoList[i].name + "</p>");
                            }
                        }

                        // TODO: don't duplicate things here ...
                        $("#div_who_players > .who_name").click(function() {
                            var name = $(this).html();
                            send_direct('honours ' + name);
                        });
                    });

                }, 0);
                break
*/
            case "IRE.Rift.Change":
                var name = gmcp_args.name;
                if (gmcp_args.amount)
                    GMCP.Rift[name] = { amount: gmcp_args.amount, desc: gmcp_args.desc };
                else
                    delete GMCP.Rift[name];

                // update the rift, but only once per 20ms to avoid too much updating
                if (GMCP.rift_update_timeout) window.clearTimeout (GMCP.rift_update_timeout);
                GMCP.rift_update_timeout = window.setTimeout(function () {
                    GMCP.rift_update_timeout = null;
                    client.render_rift();
                }, 20);
                break;

            case "IRE.Rift.List":
                GMCP.Rift = {};
                for (var i in gmcp_args) {
                    var name = gmcp_args[i].name;
                    GMCP.Rift[name] = { amount: gmcp_args[i].amount, desc: gmcp_args[i].desc };
                }
                setTimeout(function () {
                    client.render_rift();
                },0);
                break;

            case "IRE.FileStore.Content":
                var file = gmcp_args;

                if (file.name && file.name == "raw_refresh")
                {
                    //console.log(file);
                    if (file.text != "")
                    {
                        import_system(file.text);
                    }

                    $.colorbox.close();
                } else if (file.name && file.name == "raw") {
                    if (file.text != "")
                    {
                        import_system(file.text);
                    }
                }
                break;

            case "IRE.FileStore.List":
                var list = gmcp_args;
                if (client.settings_window && client.settings_window.process_filelist)
                    client.settings_window.process_filelist (list);
                break;

            case "IRE.Tasks.List":
                GMCP.TaskList = {};

                setTimeout(function () {
                    /*gmcp_args.sort(function (a,b) {
                        if (a.group < b.group)
                            return -1;
                        if (a.group > b.group)
                            return 1;
                        return 0;
                    });*/

                    var types = [ "task", "quest", "achievement" ];
                    for (var tt = 0; tt < types.length; ++tt) {
                        var type = types[tt];

                        var groups = {};
                        var grouporder = new Array();   // groups in the order in which they were encountered
                        // the "Active" group always exists on the top (only shown if we have such tasks)
                        grouporder.push("Active");
                        // Similarly, the Completed one always exists at the bottom
                        var lastgroups = new Array();
                        lastgroups.push("Completed");
                        for (var i in gmcp_args)
                        {
                            if (gmcp_args[i].type.toLowerCase().indexOf(type) < 0) continue;

                            GMCP.TaskList[type + gmcp_args[i].id] = gmcp_args[i];

                            var group = gmcp_args[i].group;
                            if (groups[group] == null) groups[group] = new Array();

                            groups[group].push(i);
                            if ((grouporder.indexOf(group) < 0) && (lastgroups.indexOf(group) < 0))
                                grouporder.push(group);
                        }

                        for (var g = 0; g < lastgroups.length; ++g)
                            grouporder.push(lastgroups[g]);

                        var tbl = $("#tbl_"+type+"s");
                        tbl.html("");
                        var count = 0;
                        var gid = 0;
                        for (var g = 0; g < grouporder.length; ++g) {
                            var group = grouporder[g];
                            if ((groups[group] == null) || (groups[group].length == 0)) continue;
                            var section = '';
                            gid++;
                            for (var idx = 0; idx < groups[group].length; ++idx) {
                                var i = groups[group][idx];

                                var html = task_html(type, gmcp_args[i]);
                                section += "<div id=\""+type+gmcp_args[i].id+"\" class=\"task_group_" + type + gid + "\">" + html + "</div>";
                            }
                            section = '<div class="subsection"><div class="heading">' + client.escape_html(group) + '</div><div class="section_content">' + section + '</div>';

                            if (count > 0)  tbl.append ('<div class="hrule"></div>');
                            tbl.append (section);
                            for (var idx = 0; idx < groups[group].length; ++idx) {
                                var i = groups[group][idx];
                                task_html_add_handler(type, gmcp_args[i]);
                            }
                            count++;
                        }
                    }
                },0);
                break;

            case "IRE.Tasks.Update":
                setTimeout(function () {

                    var types = [ "task", "quest", "achievement" ];
                    for (var tt = 0; tt < types.length; ++tt) {
                        var type = types[tt];

                        for (var i in gmcp_args)
                        {
                            if (gmcp_args[i].type.toLowerCase().indexOf(type) < 0) continue;

                            GMCP.TaskList[type + gmcp_args[i].id] = gmcp_args[i];

                            var html = task_html(type, gmcp_args[i]);

                            $("div#"+type+gmcp_args[i].id).html(html);
                            task_html_add_handler(type, gmcp_args[i]);
                        }
                    }
                },0);
                break;

            case "IRE.Time.List":
                GMCP.Time = {};

                //setTimeout(function () {
                    for (var i in gmcp_args)
                    {
                        GMCP.Time[i] = gmcp_args[i];
                    }
                //},0);
                break;

            case "IRE.Time.Update":
                //setTimeout(function () {
                    for (var i in gmcp_args)
                    {
                        GMCP.Time[i] = gmcp_args[i]
                    }
                //},0);
                break;

            case "Room.Info":
                setTimeout(function() {

                    var map = client.mapper;
                    $("#div_room_description").html(gmcp_args.desc.replace(/\n/g,"<br>"))

                    map.roomName = gmcp_args.name;
                    map.roomExits = gmcp_args.exits;

                    // these need to be before the actual map updating
                    map.set_map_background(gmcp_args.background);
                    map.set_map_linecolor(gmcp_args.linecolor);

                    map.cID = gmcp_args.num;
                    // if this is not an ohmap room, disable the mode
                    if (!gmcp_args.ohmap) map.overhead = false;

                    var coords = gmcp_args.coords.split(/,/g);
                    var coords_okay = false;
                    var area_id = undefined;
                    var x = undefined;
                    var y = undefined;
                    var z = undefined;
                    var building = undefined;

                    if (coords && coords.length >= 4) {
                        area_id = coords[0];
                        x = coords[1];
                        y = coords[2];
                        z = coords[3];
                        building = (coords.length >= 5) ? coords[4] : 0;

                        if ($.isNumeric(area_id) && $.isNumeric(x) && $.isNumeric(y) && $.isNumeric(z)) coords_okay = true;
                    }
                    if (!coords_okay)
                        // Coords can't be parsed -- show the supplied area name instead, if any.
                        map.set_area_name(gmcp_args.area);

                    last_x = map.cX;
                    last_y = map.cY;
                    last_z = map.cZ;
                    last_building = map.cB;

                    map.cX = x;
                    map.cY = y;
                    map.cZ = z;
                    map.cB = building;

                    GMCP.CurrentArea.id = area_id;
                    GMCP.CurrentArea.level = z;

                    if (coords_okay && (map.cArea != area_id))
                    {
                        map.cArea = area_id;
                        map.load_map_data();
                    } else {
                        if ((map.cZ != last_z) || (map.cB != last_building))
                        {
                            map.draw_map();
                        } else {
                            map.draw_player();
                        }
                    }

                    client.update_movement_compass(gmcp_args.exits);
                }, 0);

                gmcp_fire_event = true;
                gmcp_event_param = gmcp_args.num;
                break;

            case "IRE.Composer.Edit":
                //print(JSON.stringify(gmcp_args));

                var composer_edit = gmcp_args;

                if (composer_edit.title != "")
                {
                    $("#composer_title").html(composer_edit.title);
                }

                $.colorbox({width: "700px", open:true, inline:true, href:"#m_composer"});

                $("#composer_text").val(composer_edit.text).focus();
                break;

            case "IRE.Sound.Preload":
                preload_sound('library/' + gmcp_args.name);
                break;

            case "IRE.Sound.Play":
                fadein = fadeout = loop = false;

                if (typeof gmcp_args.fadein_csec != "undefined")
                    fadein = gmcp_args.fadein_csec * 1000; // GMCP provides in seconds, sound lib needs milliseconds //

                if (typeof gmcp_args.fadeout_csec != "undefined")
                    fadeout = gmcp_args.fadeout_csec * 1000;

                if (typeof gmcp_args.loop != "undefined" && (gmcp_args.loop == "true" || gmcp_args.loop == true))
                    loop = true;

                play_sound('library/' + gmcp_args.name, fadein, fadeout, loop);
                break;

            case "IRE.Sound.Stop":
                fadeout = false;

                if (typeof gmcp_args.fadeout_csec != "undefined")
                    fadeout = gmcp_args.fadeout_csec * 1000;

                stop_sound(gmcp_args.name, fadeout);
                break;

            case "IRE.Sound.StopAll":
                fadeout = false;

                if (typeof gmcp_args.fadeout_csec != "undefined")
                    fadeout = gmcp_args.fadeout_csec * 1000;

                stop_all_sounds(fadeout);
                break;

            case "IRE.Target.Set":
                var target = gmcp_args;
                var ntarget = parseInt(target);
                if (!isNaN(ntarget)) target = ntarget;
                client.set_current_target(target, false);

                gmcp_fire_event = true;
                gmcp_event_param = target;
                break;

            case "IRE.Target.Request":
                client.send_GMCP("IRE.Target.Set", (GMCP.Target != undefined) ? GMCP.Target: 0);
                break;

            case "IRE.Target.Info":
                var tg = parseInt(gmcp_args.id);
                var is_player = (tg == -1);
                if ((!is_player) && (tg != client.current_target())) return;   // nothing if the target has since changed - eliminates race conds. Bypassed for player targets.
                var desc = gmcp_args.short_desc;
                var hp = is_player ? undefined : gmcp_args.hpperc;
                client.set_current_target_info(desc, hp, is_player);
                break;

            // used to upload the drupal avatar
            case "IRE.Misc.OneTimePassword":
                var pwd = gmcp_args;
                dropzone_kickoff(pwd);
                break;
        }

        // Fire bound behaviors //
        $(document).trigger('onGMCP', [gmcp_method, gmcp_args]);
        run_function("onGMCP", {"gmcp_method":gmcp_method, "gmcp_args":gmcp_args}, 'ALL');
        if (gmcp_fire_event) client.handle_event('GMCP', gmcp_method, gmcp_event_param);
    }
}

client.display_text_block = function(lines, selector = '#output_main') {
    var block = generate_text_block(lines);
    update_text_completion(lines);
    if (block.length)
        ow_Write(selector, block);
}

// Rewriting the print method to interact with the generate_text_block. This will allow us to use print()
// within a text block. Normally print() always displays before the entire text block regardless of which
// line triggers it.
// setting html = true will display in line with the text block. print('stuff', true)
client.print = function(s, html = true)
{
    let inline = {
            line: s,
            type: html ? 'html' : ''
        }
    
    if (client.current_block && html) {
        
        let idx = client.current_block.length;
        if (client.current_line) idx = client.current_block.indexOf(client.current_line) + 1;
        client.current_block.splice(idx, 0, inline);
    } else {
        client.display_text_block([inline], '#output_main');
    }
}

client.send_direct = function(input, no_expansion)
{
    if (!input || typeof input == undefined)
        return false;

    var do_expansion = !no_expansion;

    if (typeof input != "string")
        input = input.toString();

    client.command_counter++;
    if (client.command_counter >= 200) {
        if (client.command_counter == 200)
            print('You seem to have sent more than 200 commands within a second. You probably have some runaway trigger or an endless alias loop - disabling commands for a while.', '#FF8080');
        client.setup_command_counter();  // just in case -- had the interval disappear at one point
        return;
    }

    var real_cmds = [];
    if (do_expansion) {
        var commands = [];
        var split_regex = new RegExp(escapeRegExp(client.stack_delimiter), 'gm');
        var parts = input.split(split_regex);

        // Delimiter split
        for (var i = 0; i < parts.length; ++i) {
            var cmd = parts[i];
            if (cmd == "") continue;
            var cmds = [];
            // Aliases
            if (aliases_enabled)
                cmds = handle_aliases(cmd);
            else
                cmds.push(cmd);

            for (var j = 0; j < cmds.length; ++j)
                commands.push(cmds[j]);
        }

        // Now process internal commands, expand variables and execute functions.
        for (var i = 0; i < commands.length; ++i) {
            var cmd = commands[i];

            if (cmd.indexOf("@set") == 0)
            {
                var temp = cmd.split(/ /);
                if (temp[1] != "" && temp[2] != "")
                {
                    if (client.set_variable(temp[1], temp[2]))
                    {
                        print("Set " + temp[1] + " to " + temp[2]);
                        display_variables();
                    }
                    continue;
                }
            }

            if (variables_enabled) cmd = handle_variables(cmd);

            if (functions_enabled)
            {
                cmd = handle_functions(cmd);
                if (!cmd) continue;
            }

            // This is a real command - add it to the queue
            real_cmds.push(cmd);
        }
    } else
        real_cmds.push(input);   // skip the cmds loop entirely if we don't expand anything

    if (!real_cmds.length) return;
    if (!ws) return;

    for (var i = 0; i < real_cmds.length; ++i) {
        var s = real_cmds[i];
        if (client.echo_input)
            print(`<span style='color:${client.color_inputecho}'>${s}</span>`, true); // nexSys: We rewrite this portion to work with our new print()
        ws_send(s + "\r\n");
    }
    last_send = new Date().getTime();
}

client.redraw_interface = function ()
        {
            console.log('redraw_interface called');
            var orig_mobile = client.mobile;
            // swap mobile mode as needed
            if ($(window).width() > 1000)
                client.mobile = 0;
            else if ($(window).width() > 750)
                client.mobile = 1;
            else
                client.mobile = 2;
            if (client.real_mobile) client.mobile = 2;

            // if the layout type changed, we need to redraw everything
            if (client.mobile != orig_mobile) {
                reset_ui(false);
                return;
            }

            client.clear_scrolling();

            client.do_layout();
        //    $('#holder').html('');

            client.apply_stylesheet();
            client.mapper.handle_redraw();
            client.draw_affdef_tab();
            client.update_tab_captions();
            client.update_output_windows();
            client.fix_input_line_height(false);
            client.relayout_status_bar();
            client.relayout_gauges();
            client.draw_bottom_buttons();
            client.setup_scrolling();
            client.record_floater_locations();
            client.update_fonts();
            client.update_tooltip_state();
            client.setup_movement_compass();
            //client.update_layout_for_mobile(); // nexGui: This function will override the height settings. nexGui not designed for mobile anyway so we comment out.
            $('body').removeClass('reverted');
            if (client.reverted) $('body').addClass('reverted');
            if (GMCP.gauge_data) {
                parse_gauges(GMCP.gauge_data);
                if (client.game == 'Lusternia') client.parse_lusternia_wounds(GMCP.gauge_data);
            }

            // the resizable jQuery plug-in doesn't handle our DOM shenanigans very well, so we need to fix it
            $('.ui-resizable').each(function() {
                var i = $(this).resizable('instance');
                i.element = $(this);
                i.handles.s[0] = $(this).children('.ui-resizable-s')[0];
            });
}

client.relayout_status_bar = function() {
    console.log('relayout_status_bar called');
    previous_status = undefined;

    // for the small mobile layout, there is no status bar
    if (client.mobile == 2) {
        $('#container').css('height', '100%');
        $('#push').css('height', '0');
        $('#footer').hide();
        return;
    }
    
    return; // nexGui: We don't need to relayout the status bar.
    
    $('#container').css('height', '');
    $('#push').css('height', '');
    $('#footer').css('height', '').show();

    var w = $('#footer').width() - 465 - (($('#vote').css('display') == 'block') ? $('#vote').width()+10 : 0);
    $('#character_module_status').css('width', w);
    var divs = $('#character_module_status > div');
    // so the first div needs to reach exactly to the beginning of the output window (20% of total width)
    var firstw = $('#footer').width() * 0.2 - $('#character_module_status').offset().left - 37 /*37 is padding*/;
    var len = divs.length;
    divs.css('display', '');
    if (client.mobile) {
        // remove the ping and gold ones for the mobile layout
        divs.filter('#status-ping, #status-gold').css('display', 'none');
        len -= 2;
    }
    var diff = 39 + firstw / (len - 2);
    // spread divs out evenly; the target one takes two slots (=is twice as wide)
    if (divs.length) divs.css('width', 'calc(' + 100 / len + '% - '+diff+'px)');
    divs.filter('#status-target').css('width', 'calc(' + 2 * 100 / len + '% - '+diff+'px)');
    divs.filter('#status-level').css('width', firstw+'px');
}

client.generate_text_block = function(lines) {
    var count = 0;

    var timestamp;
    if (client.show_timestamp_milliseconds === true)
        timestamp = client.getTimeMS();
    else
        timestamp = client.getTimeNoMS();
    var cl = "timestamp mono no_out";
    timestamp = "<span class=\"" + cl + "\">" + timestamp + "&nbsp;</span>";

    var res = '';

    var counter = 0;
    for (var i = 0; i < lines.length; ++i) {
        var txt = lines[i].parsed_line;
        var font = lines[i].monospace ? 'mono' : '';
        var line = "<div class=\"" + font + "\">" + timestamp + (txt ? txt.formatted() : '') + "</div>";

        // we want gagged lines to be logged, too
        if (logging && txt) append_to_log(line);

        if (lines[i].gag) continue;
        counter++;

        // Added this snippet to allow print() to inject lines
		if (lines[i].type == 'html') {
        	line = "<div class=\"" + font + "\">" + timestamp + lines[i].line + "</div>";
            txt = true;
        }

        if (txt) {
            count++;
            res += line;
        }
        var pr = lines[i].parsed_prompt;
        if (pr && (count > 0)) {   // no prompt if we gagged everything
            res += "<div class=\"prompt " + font + "\">" + timestamp + pr.formatted() + "</div>";
        }
        // empty line - include it if it's neither the first nor the last one
        // using "counter" instead of "i" fixes problems where the empty line is included after channel markers and such
        if ((!pr) && (!txt) && (counter > 1) && (i < lines.length - 1)) {
            res += '<div line>' + timestamp + '&nbsp;' + '</div>';
        }
    }
    if (client.extra_break && res.length) res += "<br />";
    return res;
}
        