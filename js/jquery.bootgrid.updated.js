! function(t, e) {
    "use strict";

    function i(t) {
        function e(e) {
            return i.identifier && e[i.identifier] === t[i.identifier]
        }
        var i = this;
        return this.rows.contains(e) ? !1 : (this.rows.push(t), !0)
    }

    function s(e) {
        var i = this.footer ? this.footer.find(e) : t(),
            s = this.header ? this.header.find(e) : t();
        return t.merge(i, s)
    }

    function o(e) {
        return e ? t.extend({}, this.cachedParams, {
            ctx: e
        }) : this.cachedParams
    }

    function n() {
        var e = {
                current: this.current,
                rowCount: this.rowCount,
                sort: this.sortDictionary,
                searchPhrase: this.searchPhrase
            },
            i = this.options.post;
        return i = t.isFunction(i) ? i() : i, this.options.requestHandler(t.extend(!0, e, i))
    }

    function r(e) {
        return "." + t.trim(e).replace(/\s+/gm, ".")
    }

    function l() {
        var e = this.options.url;
        return t.isFunction(e) ? e() : e
    }

    function a() {
        this.element.trigger("initialize" + j), d.call(this), this.selection = this.options.selection && null != this.identifier, p.call(this), g.call(this), R.call(this), k.call(this), v.call(this), u.call(this), this.element.trigger("initialized" + j)
    }

    function c() {
        this.options.highlightRows
    }

    function h(t) {
        return t.visible
    }

    function d() {
        var e = this,
            i = this.element.find("thead > tr").first(),
            s = !1;
        i.children().each(function() {
            var i = t(this),
                o = i.data(),
                n = {
                    id: o.columnId,
                    identifier: null == e.identifier && o.identifier || !1,
                    converter: e.options.converters[o.converter || o.type] || e.options.converters.string,
                    text: i.text(),
                    align: o.align || "left",
                    headerAlign: o.headerAlign || "left",
                    cssClass: o.cssClass || "",
                    headerCssClass: o.headerCssClass || "",
                    formatter: e.options.formatters[o.formatter] || null,
                    order: s || "asc" !== o.order && "desc" !== o.order ? null : o.order,
                    searchable: !(o.searchable === !1),
                    sortable: !(o.sortable === !1),
                    visible: !(o.visible === !1),
                    visibleInSelection: !(o.visibleInSelection === !1),
                    width: t.isNumeric(o.width) ? o.width + "px" : "string" == typeof o.width ? o.width : null
                };
            e.columns.push(n), null != n.order && (e.sortDictionary[n.id] = n.order), n.identifier && (e.identifier = n.id, e.converter = n.converter), e.options.multiSort || null === n.order || (s = !0)
        })
    }

    function u() {
        function i(t) {
            for (var e, i = new RegExp(o.searchPhrase, o.options.caseSensitive ? "g" : "gi"), s = 0; s < o.columns.length; s++){
                e = o.columns[s];
                if (e.id !="commands" && t[e.id]!=null && e.searchable && e.visible && e.converter.to(t[e.id]).search(i) > -1) return !0;
     
            }
            return !1
        }

        function s(t, e) {
            o.currentRows = t, f.call(o, e), o.options.keepSelection || (o.selectedRows = []), D.call(o, t), b.call(o), y.call(o), o.element._bgBusyAria(!1).trigger("loaded" + j)
        }
        var o = this;
        if (this.element._bgBusyAria(!0).trigger("load" + j), P.call(this), this.options.ajax) {
            var r = n.call(this),
                a = l.call(this);
            if (null == a || "string" != typeof a || 0 === a.length) throw new Error("Url setting must be a none empty string or a function that returns one.");
            this.xqr && this.xqr.abort();
            var c = {
                url: a,
                data: r,
                success: function(e) {
                    o.xqr = null, "string" == typeof e && (e = t.parseJSON(e)), e = o.options.responseHandler(e), o.current = e.current, s(e.rows, e.total)
                },
                error: function(t, e) {
                    o.xqr = null, "abort" !== e && (w.call(o), o.element._bgBusyAria(!1).trigger("loaded" + j))
                }
            };
            c = t.extend(this.options.ajaxSettings, c), this.xqr = t.ajax(c)
        } else {
            var h = this.searchPhrase.length > 0 ? this.rows.where(i) : this.rows,
                d = h.length; - 1 !== this.rowCount && (h = h.page(this.current, this.rowCount)), e.setTimeout(function() {
                s(h, d)
            }, 10)
        }
    }

    function p() {
        if (!this.options.ajax) {
            var e = this,
                s = this.element.find("tbody > tr");
            s.each(function() {
                var s = t(this),
                    o = s.children("td"),
                    n = {};
                t.each(e.columns, function(t, e) {
                    n[e.id] = e.converter.from(o.eq(t).text())
                }), i.call(e, n)
            }), f.call(this, this.rows.length), B.call(this)
        }
    }

    function f(t) {
        this.total = t, this.totalPages = -1 === this.rowCount ? 1 : Math.ceil(this.total / this.rowCount)
    }

    function g() {
        var e = this.options.templates,
            i = this.element.parent().hasClass(this.options.css.responsiveTable) ? this.element.parent() : this.element;
        this.element.addClass(this.options.css.table), 0 === this.element.children("tbody").length && this.element.append(e.body), 1 & this.options.navigation && (this.header = t(e.header.resolve(o.call(this, {
            id: this.element._bgId() + "-header"
        }))), i.before(this.header)), 2 & this.options.navigation && (this.footer = t(e.footer.resolve(o.call(this, {
            id: this.element._bgId() + "-footer"
        }))), i.after(this.footer))
    }

    function v() {
        if (0 !== this.options.navigation) {
            var e = this.options.css,
                i = r(e.actions),
                n = s.call(this, i);
            if (n.length > 0) {
                var l = this,
                    a = this.options.templates,
                    c = t(a.actions.resolve(o.call(this)));
                if (this.options.ajax) {
                    var h = a.icon.resolve(o.call(this, {
                            iconCss: e.iconRefresh
                        })),
                        d = t(a.actionButton.resolve(o.call(this, {
                            content: h,
                            text: this.options.labels.refresh
                        }))).on("click" + j, function(t) {
                            t.stopPropagation(), l.current = 1, u.call(l)
                        });
                    c.append(d)
                }
                C.call(this, c), m.call(this, c), I.call(this, n, c)
            }
        }
    }

    function m(e) {
        if (this.options.columnSelection && this.columns.length > 1) {
            var i = this,
                s = this.options.css,
                n = this.options.templates,
                l = n.icon.resolve(o.call(this, {
                    iconCss: s.iconColumns
                })),
                a = t(n.actionDropDown.resolve(o.call(this, {
                    content: l
                }))),
                c = r(s.dropDownItem),
                d = r(s.dropDownItemCheckbox),
                p = r(s.dropDownMenuItems);
            t.each(this.columns, function(e, l) {
                if (l.visibleInSelection) {
                    var f = t(n.actionDropDownCheckboxItem.resolve(o.call(i, {
                        name: l.id,
                        label: l.text,
                        checked: l.visible
                    }))).on("click" + j, c, function(e) {
                        e.stopPropagation();
                        var s = t(this),
                            o = s.find(d);
                        if (!o.prop("disabled")) {
                            l.visible = o.prop("checked");
                            var n = i.columns.where(h).length > 1;
                            s.parents(p).find(c + ":has(" + d + ":checked)")._bgEnableAria(n).find(d)._bgEnableField(n), i.element.find("tbody").empty(), R.call(i), u.call(i)
                        }
                    });
                    a.find(r(s.dropDownMenuItems)).append(f)
                }
            }), e.append(a)
        }
    }

    function b() {
        if (0 !== this.options.navigation) {
            var e = r(this.options.css.infos),
                i = s.call(this, e);
            if (i.length > 0) {
                var n = this.current * this.rowCount,
                    l = t(this.options.templates.infos.resolve(o.call(this, {
                        end: 0 === this.total || -1 === n || n > this.total ? this.total : n,
                        start: 0 === this.total ? 0 : n - this.rowCount + 1,
                        total: this.total
                    })));
                I.call(this, i, l)
            }
        }
    }

    function w() {
        var t = this.element.children("tbody").first(),
            e = this.options.templates,
            i = this.columns.where(h).length;
        this.selection && (i += 1), t.html(e.noResults.resolve(o.call(this, {
            columns: i
        })))
    }

    function y() {
        if (0 !== this.options.navigation) {
            var e = r(this.options.css.pagination),
                i = s.call(this, e)._bgShowAria(-1 !== this.rowCount);
            if (-1 !== this.rowCount && i.length > 0) {
                var n = this.options.templates,
                    l = this.current,
                    a = this.totalPages,
                    c = t(n.pagination.resolve(o.call(this))),
                    h = a - l,
                    d = -1 * (this.options.padding - l),
                    u = h >= this.options.padding ? Math.max(d, 1) : Math.max(d - this.options.padding + h, 1),
                    p = 2 * this.options.padding + 1,
                    f = a >= p ? p : a;
                x.call(this, c, "first", "<i class='zmdi zmdi-more-horiz'></i>", "first")._bgEnableAria(l > 1), x.call(this, c, "prev", "<i class='zmdi zmdi-chevron-left'></i>", "prev")._bgEnableAria(l > 1);
                for (var g = 0; f > g; g++) {
                    var v = g + u;
                    x.call(this, c, v, v, "page-" + v)._bgEnableAria()._bgSelectAria(v === l)
                }
                0 === f && x.call(this, c, 1, 1, "page-1")._bgEnableAria(!1)._bgSelectAria(), x.call(this, c, "next", "<i class='zmdi zmdi-chevron-right'></i>", "next")._bgEnableAria(a > l), x.call(this, c, "last", "<i class='zmdi zmdi-more-horiz'></i>", "last")._bgEnableAria(a > l), I.call(this, i, c)
            }
        }
    }

    function x(e, i, s, n) {
        var l = this,
            a = this.options.templates,
            c = this.options.css,
            h = o.call(this, {
                css: n,
                text: s,
                page: i
            }),
            d = t(a.paginationItem.resolve(h)).on("click" + j, r(c.paginationButton), function(e) {
                e.stopPropagation(), e.preventDefault();
                var i = t(this),
                    s = i.parent();
                if (!s.hasClass("active") && !s.hasClass("disabled")) {
                    var o = {
                            first: 1,
                            prev: l.current - 1,
                            next: l.current + 1,
                            last: l.totalPages
                        },
                        n = i.data("page");
                    l.current = o[n] || n, u.call(l)
                }
                i.trigger("blur")
            });
        return e.append(d), d
    }

    function C(e) {
        function i(t) {
            return -1 === t ? s.options.labels.all : t
        }
        var s = this,
            n = this.options.rowCount;
        if (t.isArray(n)) {
            var l = this.options.css,
                a = this.options.templates,
                c = t(a.actionDropDown.resolve(o.call(this, {
                    content: i(this.rowCount)
                }))),
                h = r(l.dropDownMenu),
                d = r(l.dropDownMenuText),
                p = r(l.dropDownMenuItems),
                f = r(l.dropDownItemButton);
            t.each(n, function(e, n) {
                var r = t(a.actionDropDownItem.resolve(o.call(s, {
                    text: i(n),
                    action: n
                })))._bgSelectAria(n === s.rowCount).on("click" + j, f, function(e) {
                    e.preventDefault();
                    var o = t(this),
                        n = o.data("action");
                    n !== s.rowCount && (s.current = 1, s.rowCount = n, o.parents(p).children().each(function() {
                        var e = t(this),
                            i = e.find(f).data("action");
                        e._bgSelectAria(i === n)
                    }), o.parents(h).find(d).text(i(n)), u.call(s))
                });
                c.find(p).append(r)
            }), e.append(c)
        }
    }

    function D(e) {
        if (e.length > 0) {
            var i = this,
                s = this.options.css,
                n = this.options.templates,
                l = this.element.children("tbody").first(),
                a = !0,
                c = "";
            t.each(e, function(e, r) {
                var l = "",
                    h = ' data-row-id="' + (null == i.identifier ? e : r[i.identifier]) + '"',
                    d = "";
                if (i.selection) {
                    var u = -1 !== t.inArray(r[i.identifier], i.selectedRows),
                        p = n.select.resolve(o.call(i, {
                            type: "checkbox",
                            value: r[i.identifier],
                            checked: u
                        }));
                    l += n.cell.resolve(o.call(i, {
                        content: p,
                        css: s.selectCell
                    })), a = a && u, u && (d += s.selected, h += ' aria-selected="true"')
                }
                var f = null != r.status && i.options.statusMapping[r.status];
                f && (d += f), t.each(i.columns, function(e, a) {
                    if (a.visible) {
                        var c = t.isFunction(a.formatter) ? a.formatter.call(i, a, r) : a.converter.to(r[a.id]),
                            h = a.cssClass.length > 0 ? " " + a.cssClass : "";
                        l += n.cell.resolve(o.call(i, {
                            content: null == c || "" === c ? "&nbsp;" : c,
                            css: ("right" === a.align ? s.right : "center" === a.align ? s.center : s.left) + h,
                            style: null == a.width ? "" : "width:" + a.width + ";"
                        }))
                    }
                }), d.length > 0 && (h += ' class="' + d + '"'), c += n.row.resolve(o.call(i, {
                    attr: h,
                    cells: l
                }))
            }), i.element.find("thead " + r(i.options.css.selectBox)).prop("checked", a), l.html(c), A.call(this, l)
        } else w.call(this)
    }

    function A(e) {
        var i = this,
            s = r(this.options.css.selectBox);
        this.selection && e.off("click" + j, s).on("click" + j, s, function(e) {
            e.stopPropagation();
            var s = t(this),
                o = i.converter.from(s.val());
            s.prop("checked") ? i.select([o]) : i.deselect([o])
        }), e.off("click" + j, "> tr").on("click" + j, "> tr", function(e) {
            e.stopPropagation();
            var s = t(this),
                o = null == i.identifier ? s.data("row-id") : i.converter.from(s.data("row-id") + ""),
                n = null == i.identifier ? i.currentRows[o] : i.currentRows.first(function(t) {
                    return t[i.identifier] === o
                });
            i.selection && i.options.rowSelect && (s.hasClass(i.options.css.selected) ? i.deselect([o]) : i.select([o])), i.element.trigger("click" + j, [i.columns, n])
        })
    }

    function k() {
        if (0 !== this.options.navigation) {
            var i = this.options.css,
                n = r(i.search),
                l = s.call(this, n);
            if (l.length > 0) {
                var a = this,
                    c = this.options.templates,
                    h = null,
                    d = "",
                    u = r(i.searchField),
                    p = t(c.search.resolve(o.call(this))),
                    f = p.is(u) ? p : p.find(u);
                f.on("keyup" + j, function(i) {
                    i.stopPropagation();
                    var s = t(this).val();
                    (d !== s || 13 === i.which && "" !== s) && (d = s, (13 === i.which || 0 === s.length || s.length >= a.options.searchSettings.characters) && (e.clearTimeout(h), h = e.setTimeout(function() {
                        S.call(a, s)
                    }, a.options.searchSettings.delay)))
                }), I.call(this, l, p)
            }
        }
    }

    function S(t) {
        this.searchPhrase !== t && (this.current = 1, this.searchPhrase = t, u.call(this))
    }

    function R() {
        var e = this,
            i = this.element.find("thead > tr"),
            s = this.options.css,
            n = this.options.templates,
            l = "",
            a = this.options.sorting;
        if (this.selection) {
            var c = this.options.multiSelect ? n.select.resolve(o.call(e, {
                type: "checkbox",
                value: "all"
            })) : "";
            l += n.rawHeaderCell.resolve(o.call(e, {
                content: c,
                css: s.selectCell
            }))
        }
        if (t.each(this.columns, function(t, i) {
                if (i.visible) {
                    var r = e.sortDictionary[i.id],
                        c = a && r && "asc" === r ? s.iconUp : a && r && "desc" === r ? s.iconDown : "",
                        h = n.icon.resolve(o.call(e, {
                            iconCss: c
                        })),
                        d = i.headerAlign,
                        u = i.headerCssClass.length > 0 ? " " + i.headerCssClass : "";
                    l += n.headerCell.resolve(o.call(e, {
                        column: i,
                        icon: h,
                        sortable: a && i.sortable && s.sortable || "",
                        css: ("right" === d ? s.right : "center" === d ? s.center : s.left) + u,
                        style: null == i.width ? "" : "width:" + i.width + ";"
                    }))
                }
            }), i.html(l), a) {
            var h = r(s.sortable);
            i.off("click" + j, h).on("click" + j, h, function(i) {
                i.preventDefault(), _.call(e, t(this)), B.call(e), u.call(e)
            })
        }
        if (this.selection && this.options.multiSelect) {
            var d = r(s.selectBox);
            i.off("click" + j, d).on("click" + j, d, function(i) {
                i.stopPropagation(), t(this).prop("checked") ? e.select() : e.deselect()
            })
        }
    }

    function _(t) {
        var e = this.options.css,
            i = r(e.icon),
            s = t.data("column-id") || t.parents("th").first().data("column-id"),
            o = this.sortDictionary[s],
            n = t.find(i);
        if (this.options.multiSort || (t.parents("tr").first().find(i).removeClass(e.iconDown + " " + e.iconUp), this.sortDictionary = {}), o && "asc" === o) this.sortDictionary[s] = "desc", n.removeClass(e.iconUp).addClass(e.iconDown);
        else if (o && "desc" === o)
            if (this.options.multiSort) {
                var l = {};
                for (var a in this.sortDictionary) a !== s && (l[a] = this.sortDictionary[a]);
                this.sortDictionary = l, n.removeClass(e.iconDown)
            } else this.sortDictionary[s] = "asc", n.removeClass(e.iconDown).addClass(e.iconUp);
        else this.sortDictionary[s] = "asc", n.addClass(e.iconUp)
    }

    function I(e, i) {
        e.each(function(e, s) {
            t(s).before(i.clone(!0)).remove()
        })
    }

    function P() {
        var t = this;
        e.setTimeout(function() {
            if ("true" === t.element._bgAria("busy")) {
                var e = t.options.templates,
                    i = t.element.children("thead").first(),
                    s = t.element.children("tbody").first(),
                    n = s.find("tr > td").first(),
                    r = t.element.height() - i.height() - (n.height() + 20),
                    l = t.columns.where(h).length;
                t.selection && (l += 1), s.html(e.loading.resolve(o.call(t, {
                    columns: l
                }))), -1 !== t.rowCount && r > 0 && s.find("tr > td").css("padding", "20px 0 " + r + "px")
            }
        }, 250)
    }

    function B() {
        function t(i, s, o) {
            function n(t) {
                return "asc" === l.order ? t : -1 * t
            }
            o = o || 0;
            var r = o + 1,
                l = e[o];
            return i[l.id] > s[l.id] ? n(1) : i[l.id] < s[l.id] ? n(-1) : e.length > r ? t(i, s, r) : 0
        }
        var e = [];
        if (!this.options.ajax) {
            for (var i in this.sortDictionary)(this.options.multiSort || 0 === e.length) && e.push({
                id: i,
                order: this.sortDictionary[i]
            });
            e.length > 0 && this.rows.sort(t)
        }
    }
    var j = ".rs.jquery.bootgrid",
        M = function(e, i) {
            this.element = t(e), this.origin = this.element.clone(), this.options = t.extend(!0, {}, M.defaults, this.element.data(), i);
            var s = this.options.rowCount = this.element.data().rowCount || i.rowCount || this.options.rowCount;
            this.columns = [], this.current = 1, this.currentRows = [], this.identifier = null, this.selection = !1, this.converter = null, this.rowCount = t.isArray(s) ? s[0] : s, this.rows = [], this.searchPhrase = "", this.selectedRows = [], this.sortDictionary = {}, this.total = 0, this.totalPages = 0, this.cachedParams = {
                lbl: this.options.labels,
                css: this.options.css,
                ctx: {}
            }, this.header = null, this.footer = null, this.xqr = null
        };
    if (M.defaults = {
            navigation: 3,
            padding: 2,
            columnSelection: !0,
            rowCount: [10, 25, 50, -1],
            selection: !1,
            multiSelect: !1,
            rowSelect: !1,
            keepSelection: !1,
            highlightRows: !1,
            sorting: !0,
            multiSort: !1,
            searchSettings: {
                delay: 250,
                characters: 1
            },
            ajax: !1,
            ajaxSettings: {
                method: "POST"
            },
            post: {},
            url: "",
            caseSensitive: !0,
            requestHandler: function(t) {
                return t
            },
            responseHandler: function(t) {
                return t
            },
            converters: {
                numeric: {
                    from: function(t) {
                        return +t
                    },
                    to: function(t) {
                        return t + ""
                    }
                },
                string: {
                    from: function(t) {
                        return t
                    },
                    to: function(t) {
                        return t
                    }
                }
            },
            css: {
                actions: "actions btn-group",
                center: "text-center",
                columnHeaderAnchor: "column-header-anchor",
                columnHeaderText: "text",
                dropDownItem: "dropdown-item",
                dropDownItemButton: "dropdown-item-button",
                dropDownItemCheckbox: "dropdown-item-checkbox",
                dropDownMenu: "dropdown btn-group",
                dropDownMenuItems: "dropdown-menu pull-right",
                dropDownMenuText: "dropdown-text",
                footer: "bootgrid-footer container-fluid",
                header: "bootgrid-header container-fluid",
                icon: "icon glyphicon",
                iconColumns: "glyphicon-th-list",
                iconDown: "glyphicon-chevron-down",
                iconRefresh: "glyphicon-refresh",
                iconSearch: "glyphicon-search",
                iconUp: "glyphicon-chevron-up",
                infos: "infos",
                left: "text-left",
                pagination: "pagination",
                paginationButton: "button",
                responsiveTable: "table-responsive",
                right: "text-right",
                search: "search form-group",
                searchField: "search-field form-control",
                selectBox: "select-box",
                selectCell: "select-cell",
                selected: "active",
                sortable: "sortable",
                table: "bootgrid-table table"
            },
            formatters: {},
            labels: {
                all: "All",
                infos: "Showing {{ctx.start}} to {{ctx.end}} of {{ctx.total}} entries",
                loading: "Loading...",
                noResults: "No results found!",
                refresh: "Refresh",
                search: "Search"
            },
            statusMapping: {
                0: "success",
                1: "info",
                2: "warning",
                3: "danger"
            },
            templates: {
                actionButton: '<button class="btn btn-default" type="button" title="{{ctx.text}}">{{ctx.content}}</button>',
                actionDropDown: '<div class="{{css.dropDownMenu}}"><button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown"><span class="{{css.dropDownMenuText}}">{{ctx.content}}</span> <span class="caret"></span></button><ul class="{{css.dropDownMenuItems}}" role="menu"></ul></div>',
                actionDropDownItem: '<li><a data-action="{{ctx.action}}" class="{{css.dropDownItem}} {{css.dropDownItemButton}}">{{ctx.text}}</a></li>',
                actionDropDownCheckboxItem: '<li><div class="checkbox"><label class="{{css.dropDownItem}}"><input name="{{ctx.name}}" type="checkbox" value="1" class="{{css.dropDownItemCheckbox}}" {{ctx.checked}} /> {{ctx.label}}<i class="input-helper"></i></label></div></li>',
                actions: '<div class="{{css.actions}}"></div>',
                body: "<tbody></tbody>",
                cell: '<td class="{{ctx.css}}" style="{{ctx.style}}">{{ctx.content}}</td>',
                footer: '<div id="{{ctx.id}}" class="{{css.footer}}"><div class="row"><div class="col-sm-6"><p class="{{css.pagination}}"></p></div><div class="col-sm-6 infoBar"><p class="{{css.infos}}"></p></div></div></div>',
                header: '<div id="{{ctx.id}}" class="{{css.header}}"><div class="row"><div class="col-sm-12 actionBar"><p class="{{css.search}}"></p><p class="{{css.actions}}"></p></div></div></div>',
                headerCell: '<th data-column-id="{{ctx.column.id}}" class="{{ctx.css}}" style="{{ctx.style}}"><a href="javascript:void(0);" class="{{css.columnHeaderAnchor}} {{ctx.sortable}}"><span class="{{css.columnHeaderText}}">{{ctx.column.text}}</span>{{ctx.icon}}</a></th>',
                icon: '<span class="{{css.icon}} {{ctx.iconCss}}"></span>',
                infos: '<div class="{{css.infos}}">{{lbl.infos}}</div>',
                loading: '<tr><td colspan="{{ctx.columns}}" class="loading">{{lbl.loading}}</td></tr>',
                noResults: '<tr><td colspan="{{ctx.columns}}" class="no-results">{{lbl.noResults}}</td></tr>',
                pagination: '<ul class="{{css.pagination}}"></ul>',
                paginationItem: '<li class="{{ctx.css}}"><a data-page="{{ctx.page}}" class="{{css.paginationButton}}">{{ctx.text}}</a></li>',
                rawHeaderCell: '<th class="{{ctx.css}}">{{ctx.content}}</th>',
                row: "<tr{{ctx.attr}}>{{ctx.cells}}</tr>",
                search: '<div class="{{css.search}}"><div class="input-group"><span class="{{css.icon}} input-group-addon {{css.iconSearch}}"></span> <input type="text" class="{{css.searchField}}" placeholder="{{lbl.search}}" /></div></div>',
                select: '<div class="checkbox"><label><input name="select" type="{{ctx.type}}" class="{{css.selectBox}}" value="{{ctx.value}}" {{ctx.checked}} /><i class="input-helper"></i></label></div>'
            }
        }, M.prototype.append = function(t) {
            if (this.options.ajax);
            else {
                for (var e = [], s = 0; s < t.length; s++) i.call(this, t[s]) && e.push(t[s]);
                B.call(this), c.call(this, e), u.call(this), this.element.trigger("appended" + j, [e])
            }
            return this
        }, M.prototype.clear = function() {
            if (this.options.ajax);
            else {
                var e = t.extend([], this.rows);
                this.rows = [], this.current = 1, this.total = 0, u.call(this), this.element.trigger("cleared" + j, [e])
            }
            return this
        }, M.prototype.destroy = function() {
            return t(e).off(j), 1 & this.options.navigation && this.header.remove(), 2 & this.options.navigation && this.footer.remove(), this.element.before(this.origin).remove(), this
        }, M.prototype.reload = function() {
            return this.current = 1, u.call(this), this
        }, M.prototype.remove = function(t) {
            if (null != this.identifier) {
                if (this.options.ajax);
                else {
                    t = t || this.selectedRows;
                    for (var e, i = [], s = 0; s < t.length; s++) {
                        e = t[s];
                        for (var o = 0; o < this.rows.length; o++)
                            if (this.rows[o][this.identifier] === e) {
                                i.push(this.rows[o]), this.rows.splice(o, 1);
                                break
                            }
                    }
                    this.current = 1, u.call(this), this.element.trigger("removed" + j, [i])
                }
            }
            return this
        }, M.prototype.search = function(t) {
            if (t = t || "", this.searchPhrase !== t) {
                var e = r(this.options.css.searchField),
                    i = s.call(this, e);
                i.val(t)
            }
            return S.call(this, t), this
        }, M.prototype.select = function(e) {
            if (this.selection) {
                e = e || this.currentRows.propValues(this.identifier);
                for (var i, s, o = []; e.length > 0 && (this.options.multiSelect || 1 !== o.length);)
                    if (i = e.pop(), -1 === t.inArray(i, this.selectedRows))
                        for (s = 0; s < this.currentRows.length; s++)
                            if (this.currentRows[s][this.identifier] === i) {
                                o.push(this.currentRows[s]), this.selectedRows.push(i);
                                break
                            }
                if (o.length > 0) {
                    var n = r(this.options.css.selectBox),
                        l = this.selectedRows.length >= this.currentRows.length;
                    for (s = 0; !this.options.keepSelection && l && s < this.currentRows.length;) l = -1 !== t.inArray(this.currentRows[s++][this.identifier], this.selectedRows);
                    for (this.element.find("thead " + n).prop("checked", l), this.options.multiSelect || this.element.find("tbody > tr " + n + ":checked").trigger("click" + j), s = 0; s < this.selectedRows.length; s++) this.element.find('tbody > tr[data-row-id="' + this.selectedRows[s] + '"]').addClass(this.options.css.selected)._bgAria("selected", "true").find(n).prop("checked", !0);
                    this.element.trigger("selected" + j, [o])
                }
            }
            return this
        }, M.prototype.deselect = function(e) {
            if (this.selection) {
                e = e || this.currentRows.propValues(this.identifier);
                for (var i, s, o, n = []; e.length > 0;)
                    if (i = e.pop(), o = t.inArray(i, this.selectedRows), -1 !== o)
                        for (s = 0; s < this.currentRows.length; s++)
                            if (this.currentRows[s][this.identifier] === i) {
                                n.push(this.currentRows[s]), this.selectedRows.splice(o, 1);
                                break
                            }
                if (n.length > 0) {
                    var l = r(this.options.css.selectBox);
                    for (this.element.find("thead " + l).prop("checked", !1), s = 0; s < n.length; s++) this.element.find('tbody > tr[data-row-id="' + n[s][this.identifier] + '"]').removeClass(this.options.css.selected)._bgAria("selected", "false").find(l).prop("checked", !1);
                    this.element.trigger("deselected" + j, [n])
                }
            }
            return this
        }, M.prototype.sort = function(e) {
            var i = e ? t.extend({}, e) : {};
            return i === this.sortDictionary ? this : (this.sortDictionary = i, R.call(this), B.call(this), u.call(this), this)
        }, M.prototype.getColumnSettings = function() {
            return t.merge([], this.columns)
        }, M.prototype.getCurrentPage = function() {
            return this.current
        }, M.prototype.getCurrentRows = function() {
            return t.merge([], this.currentRows)
        }, M.prototype.getRowCount = function() {
            return this.rowCount
        }, M.prototype.getSearchPhrase = function() {
            return this.searchPhrase
        }, M.prototype.getSelectedRows = function() {
            return t.merge([], this.selectedRows)
        }, M.prototype.getSortDictionary = function() {
            return t.extend({}, this.sortDictionary)
        }, M.prototype.getTotalPageCount = function() {
            return this.totalPages
        }, M.prototype.getTotalRowCount = function() {
            return this.total
        }, t.fn.extend({
            _bgAria: function(t, e) {
                return e ? this.attr("aria-" + t, e) : this.attr("aria-" + t)
            },
            _bgBusyAria: function(t) {
                return null == t || t ? this._bgAria("busy", "true") : this._bgAria("busy", "false")
            },
            _bgRemoveAria: function(t) {
                return this.removeAttr("aria-" + t)
            },
            _bgEnableAria: function(t) {
                return null == t || t ? this.removeClass("disabled")._bgAria("disabled", "false") : this.addClass("disabled")._bgAria("disabled", "true")
            },
            _bgEnableField: function(t) {
                return null == t || t ? this.removeAttr("disabled") : this.attr("disabled", "disable")
            },
            _bgShowAria: function(t) {
                return null == t || t ? this.show()._bgAria("hidden", "false") : this.hide()._bgAria("hidden", "true")
            },
            _bgSelectAria: function(t) {
                return null == t || t ? this.addClass("active")._bgAria("selected", "true") : this.removeClass("active")._bgAria("selected", "false")
            },
            _bgId: function(t) {
                return t ? this.attr("id", t) : this.attr("id")
            }
        }), !String.prototype.resolve) {
        var T = {
            checked: function(t) {
                return "boolean" == typeof t ? t ? 'checked="checked"' : "" : t
            }
        };
        String.prototype.resolve = function(e, i) {
            var s = this;
            return t.each(e, function(e, o) {
                if (null != o && "function" != typeof o)
                    if ("object" == typeof o) {
                        var n = i ? t.extend([], i) : [];
                        n.push(e), s = s.resolve(o, n) + ""
                    } else {
                        T && T[e] && "function" == typeof T[e] && (o = T[e](o)), e = i ? i.join(".") + "." + e : e;
                        var r = new RegExp("\\{\\{" + e + "\\}\\}", "gm");
                        s = s.replace(r, o.replace ? o.replace(/\$/gi, "&#36;") : o)
                    }
            }), s
        }
    }
    Array.prototype.first || (Array.prototype.first = function(t) {
        for (var e = 0; e < this.length; e++) {
            var i = this[e];
            if (t(i)) return i
        }
        return null
    }), Array.prototype.contains || (Array.prototype.contains = function(t) {
        for (var e = 0; e < this.length; e++) {
            var i = this[e];
            if (t(i)) return !0
        }
        return !1
    }), Array.prototype.page || (Array.prototype.page = function(t, e) {
        var i = (t - 1) * e,
            s = i + e;
        return this.length > i ? this.length > s ? this.slice(i, s) : this.slice(i) : []
    }), Array.prototype.where || (Array.prototype.where = function(t) {
        for (var e = [], i = 0; i < this.length; i++) {
            var s = this[i];
            t(s) && e.push(s)
        }
        return e
    }), Array.prototype.propValues || (Array.prototype.propValues = function(t) {
        for (var e = [], i = 0; i < this.length; i++) e.push(this[i][t]);
        return e
    });
    var E = t.fn.bootgrid;
    t.fn.bootgrid = function(e) {
        var i = Array.prototype.slice.call(arguments, 1),
            s = null,
            o = this.each(function(o) {
                var n = t(this),
                    r = n.data(j),
                    l = "object" == typeof e && e;
                if ((r || "destroy" !== e) && (r || (n.data(j, r = new M(this, l)), a.call(r)), "string" == typeof e))
                    if (0 === e.indexOf("get") && 0 === o) s = r[e].apply(r, i);
                    else if (0 !== e.indexOf("get")) return r[e].apply(r, i)
            });
        return "string" == typeof e && 0 === e.indexOf("get") ? s : o
    }, t.fn.bootgrid.Constructor = M, t.fn.bootgrid.noConflict = function() {
        return t.fn.bootgrid = E, this
    }, t('[data-toggle="bootgrid"]').bootgrid()
}(jQuery, window);