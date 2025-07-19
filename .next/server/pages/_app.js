/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./hooks/useAuth.js":
/*!**************************!*\
  !*** ./hooks/useAuth.js ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/api */ \"./utils/api.js\");\n/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/storage */ \"./utils/storage.js\");\n/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-hot-toast */ \"react-hot-toast\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_api__WEBPACK_IMPORTED_MODULE_3__, react_hot_toast__WEBPACK_IMPORTED_MODULE_5__]);\n([_utils_api__WEBPACK_IMPORTED_MODULE_3__, react_hot_toast__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n// Authentication context and hooks for managing user state\n\n\n\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst useAuth = ()=>{\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n    if (!context) {\n        throw new Error(\"useAuth must be used within an AuthProvider\");\n    }\n    return context;\n};\nconst AuthProvider = ({ children })=>{\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const initAuth = async ()=>{\n            const token = _utils_storage__WEBPACK_IMPORTED_MODULE_4__.storage.getToken();\n            const savedUser = _utils_storage__WEBPACK_IMPORTED_MODULE_4__.storage.getUser();\n            if (token && savedUser) {\n                setUser(savedUser);\n                // Verify token is still valid\n                try {\n                    const response = await _utils_api__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"/auth/me\");\n                    setUser(response.data.user);\n                    _utils_storage__WEBPACK_IMPORTED_MODULE_4__.storage.setUser(response.data.user);\n                } catch (error) {\n                    console.error(\"Token validation failed:\", error);\n                    logout();\n                }\n            }\n            setLoading(false);\n        };\n        initAuth();\n    }, []);\n    const login = async (token, userData)=>{\n        try {\n            _utils_storage__WEBPACK_IMPORTED_MODULE_4__.storage.setToken(token);\n            _utils_storage__WEBPACK_IMPORTED_MODULE_4__.storage.setUser(userData);\n            setUser(userData);\n            react_hot_toast__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(`Welcome back, ${userData.name}!`);\n        } catch (error) {\n            console.error(\"Login error:\", error);\n            react_hot_toast__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(\"Login failed\");\n        }\n    };\n    const logout = ()=>{\n        _utils_storage__WEBPACK_IMPORTED_MODULE_4__.storage.removeToken();\n        _utils_storage__WEBPACK_IMPORTED_MODULE_4__.storage.removeUser();\n        setUser(null);\n        router.push(\"/login\");\n        react_hot_toast__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(\"Logged out successfully\");\n    };\n    const value = {\n        user,\n        login,\n        logout,\n        loading,\n        isAuthenticated: !!user\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: value,\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/clodoaldofavaro/Developer/jump/email-sort-app-frontend/hooks/useAuth.js\",\n        lineNumber: 74,\n        columnNumber: 10\n    }, undefined);\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ob29rcy91c2VBdXRoLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUMsMkRBQTJEOztBQUNXO0FBQy9CO0FBQ1Q7QUFDWTtBQUNQO0FBRXBDLE1BQU1RLDRCQUFjUixvREFBYUE7QUFFMUIsTUFBTVMsVUFBVTtJQUNyQixNQUFNQyxVQUFVVCxpREFBVUEsQ0FBQ087SUFDM0IsSUFBSSxDQUFDRSxTQUFTO1FBQ1osTUFBTSxJQUFJQyxNQUFNO0lBQ2xCO0lBQ0EsT0FBT0Q7QUFDVCxFQUFFO0FBRUssTUFBTUUsZUFBZSxDQUFDLEVBQUVDLFFBQVEsRUFBRTtJQUN2QyxNQUFNLENBQUNDLE1BQU1DLFFBQVEsR0FBR1osK0NBQVFBLENBQUM7SUFDakMsTUFBTSxDQUFDYSxTQUFTQyxXQUFXLEdBQUdkLCtDQUFRQSxDQUFDO0lBQ3ZDLE1BQU1lLFNBQVNkLHNEQUFTQTtJQUV4QkYsZ0RBQVNBLENBQUM7UUFDUixNQUFNaUIsV0FBVztZQUNmLE1BQU1DLFFBQVFkLG1EQUFPQSxDQUFDZSxRQUFRO1lBQzlCLE1BQU1DLFlBQVloQixtREFBT0EsQ0FBQ2lCLE9BQU87WUFFakMsSUFBSUgsU0FBU0UsV0FBVztnQkFDdEJQLFFBQVFPO2dCQUNSLDhCQUE4QjtnQkFDOUIsSUFBSTtvQkFDRixNQUFNRSxXQUFXLE1BQU1uQixzREFBTyxDQUFDO29CQUMvQlUsUUFBUVMsU0FBU0UsSUFBSSxDQUFDWixJQUFJO29CQUMxQlIsbURBQU9BLENBQUNTLE9BQU8sQ0FBQ1MsU0FBU0UsSUFBSSxDQUFDWixJQUFJO2dCQUNwQyxFQUFFLE9BQU9hLE9BQU87b0JBQ2RDLFFBQVFELEtBQUssQ0FBQyw0QkFBNEJBO29CQUMxQ0U7Z0JBQ0Y7WUFDRjtZQUNBWixXQUFXO1FBQ2I7UUFFQUU7SUFDRixHQUFHLEVBQUU7SUFFTCxNQUFNVyxRQUFRLE9BQU9WLE9BQU9XO1FBQzFCLElBQUk7WUFDRnpCLG1EQUFPQSxDQUFDMEIsUUFBUSxDQUFDWjtZQUNqQmQsbURBQU9BLENBQUNTLE9BQU8sQ0FBQ2dCO1lBQ2hCaEIsUUFBUWdCO1lBQ1J4QiwrREFBYSxDQUFDLENBQUMsY0FBYyxFQUFFd0IsU0FBU0csSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqRCxFQUFFLE9BQU9QLE9BQU87WUFDZEMsUUFBUUQsS0FBSyxDQUFDLGdCQUFnQkE7WUFDOUJwQiw2REFBVyxDQUFDO1FBQ2Q7SUFDRjtJQUVBLE1BQU1zQixTQUFTO1FBQ2J2QixtREFBT0EsQ0FBQzZCLFdBQVc7UUFDbkI3QixtREFBT0EsQ0FBQzhCLFVBQVU7UUFDbEJyQixRQUFRO1FBQ1JHLE9BQU9tQixJQUFJLENBQUM7UUFDWjlCLCtEQUFhLENBQUM7SUFDaEI7SUFFQSxNQUFNK0IsUUFBUTtRQUNaeEI7UUFDQWdCO1FBQ0FEO1FBQ0FiO1FBQ0F1QixpQkFBaUIsQ0FBQyxDQUFDekI7SUFDckI7SUFFQSxxQkFBTyw4REFBQ04sWUFBWWdDLFFBQVE7UUFBQ0YsT0FBT0E7a0JBQVF6Qjs7Ozs7O0FBQzlDLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbWFpbC1zb3J0LWFwcC1mcm9udGVuZC8uL2hvb2tzL3VzZUF1dGguanM/YTQ4NyJdLCJzb3VyY2VzQ29udGVudCI6WyIgLy8gQXV0aGVudGljYXRpb24gY29udGV4dCBhbmQgaG9va3MgZm9yIG1hbmFnaW5nIHVzZXIgc3RhdGVcbmltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XG5pbXBvcnQgYXBpIGZyb20gJy4uL3V0aWxzL2FwaSc7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSAnLi4vdXRpbHMvc3RvcmFnZSc7XG5pbXBvcnQgdG9hc3QgZnJvbSAncmVhY3QtaG90LXRvYXN0JztcblxuY29uc3QgQXV0aENvbnRleHQgPSBjcmVhdGVDb250ZXh0KCk7XG5cbmV4cG9ydCBjb25zdCB1c2VBdXRoID0gKCkgPT4ge1xuICBjb25zdCBjb250ZXh0ID0gdXNlQ29udGV4dChBdXRoQ29udGV4dCk7XG4gIGlmICghY29udGV4dCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXNlQXV0aCBtdXN0IGJlIHVzZWQgd2l0aGluIGFuIEF1dGhQcm92aWRlcicpO1xuICB9XG4gIHJldHVybiBjb250ZXh0O1xufTtcblxuZXhwb3J0IGNvbnN0IEF1dGhQcm92aWRlciA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGluaXRBdXRoID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdG9rZW4gPSBzdG9yYWdlLmdldFRva2VuKCk7XG4gICAgICBjb25zdCBzYXZlZFVzZXIgPSBzdG9yYWdlLmdldFVzZXIoKTtcblxuICAgICAgaWYgKHRva2VuICYmIHNhdmVkVXNlcikge1xuICAgICAgICBzZXRVc2VyKHNhdmVkVXNlcik7XG4gICAgICAgIC8vIFZlcmlmeSB0b2tlbiBpcyBzdGlsbCB2YWxpZFxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldCgnL2F1dGgvbWUnKTtcbiAgICAgICAgICBzZXRVc2VyKHJlc3BvbnNlLmRhdGEudXNlcik7XG4gICAgICAgICAgc3RvcmFnZS5zZXRVc2VyKHJlc3BvbnNlLmRhdGEudXNlcik7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVG9rZW4gdmFsaWRhdGlvbiBmYWlsZWQ6JywgZXJyb3IpO1xuICAgICAgICAgIGxvZ291dCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9O1xuXG4gICAgaW5pdEF1dGgoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGxvZ2luID0gYXN5bmMgKHRva2VuLCB1c2VyRGF0YSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBzdG9yYWdlLnNldFRva2VuKHRva2VuKTtcbiAgICAgIHN0b3JhZ2Uuc2V0VXNlcih1c2VyRGF0YSk7XG4gICAgICBzZXRVc2VyKHVzZXJEYXRhKTtcbiAgICAgIHRvYXN0LnN1Y2Nlc3MoYFdlbGNvbWUgYmFjaywgJHt1c2VyRGF0YS5uYW1lfSFgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignTG9naW4gZXJyb3I6JywgZXJyb3IpO1xuICAgICAgdG9hc3QuZXJyb3IoJ0xvZ2luIGZhaWxlZCcpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBsb2dvdXQgPSAoKSA9PiB7XG4gICAgc3RvcmFnZS5yZW1vdmVUb2tlbigpO1xuICAgIHN0b3JhZ2UucmVtb3ZlVXNlcigpO1xuICAgIHNldFVzZXIobnVsbCk7XG4gICAgcm91dGVyLnB1c2goJy9sb2dpbicpO1xuICAgIHRvYXN0LnN1Y2Nlc3MoJ0xvZ2dlZCBvdXQgc3VjY2Vzc2Z1bGx5Jyk7XG4gIH07XG5cbiAgY29uc3QgdmFsdWUgPSB7XG4gICAgdXNlcixcbiAgICBsb2dpbixcbiAgICBsb2dvdXQsXG4gICAgbG9hZGluZyxcbiAgICBpc0F1dGhlbnRpY2F0ZWQ6ICEhdXNlcixcbiAgfTtcblxuICByZXR1cm4gPEF1dGhDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZX0+e2NoaWxkcmVufTwvQXV0aENvbnRleHQuUHJvdmlkZXI+O1xufTsiXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZUNvbnRleHQiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInVzZVJvdXRlciIsImFwaSIsInN0b3JhZ2UiLCJ0b2FzdCIsIkF1dGhDb250ZXh0IiwidXNlQXV0aCIsImNvbnRleHQiLCJFcnJvciIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwidXNlciIsInNldFVzZXIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsInJvdXRlciIsImluaXRBdXRoIiwidG9rZW4iLCJnZXRUb2tlbiIsInNhdmVkVXNlciIsImdldFVzZXIiLCJyZXNwb25zZSIsImdldCIsImRhdGEiLCJlcnJvciIsImNvbnNvbGUiLCJsb2dvdXQiLCJsb2dpbiIsInVzZXJEYXRhIiwic2V0VG9rZW4iLCJzdWNjZXNzIiwibmFtZSIsInJlbW92ZVRva2VuIiwicmVtb3ZlVXNlciIsInB1c2giLCJ2YWx1ZSIsImlzQXV0aGVudGljYXRlZCIsIlByb3ZpZGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./hooks/useAuth.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-query */ \"@tanstack/react-query\");\n/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-toast */ \"react-hot-toast\");\n/* harmony import */ var _hooks_useAuth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/useAuth */ \"./hooks/useAuth.js\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__, react_hot_toast__WEBPACK_IMPORTED_MODULE_2__, _hooks_useAuth__WEBPACK_IMPORTED_MODULE_3__]);\n([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__, react_hot_toast__WEBPACK_IMPORTED_MODULE_2__, _hooks_useAuth__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n// Main app component with providers for authentication and data fetching\n\n\n\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    const [queryClient] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(()=>new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.QueryClient({\n            defaultOptions: {\n                queries: {\n                    retry: 1,\n                    staleTime: 5 * 60 * 1000,\n                    refetchOnWindowFocus: false\n                }\n            }\n        }));\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.QueryClientProvider, {\n        client: queryClient,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_hooks_useAuth__WEBPACK_IMPORTED_MODULE_3__.AuthProvider, {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"/Users/clodoaldofavaro/Developer/jump/email-sort-app-frontend/pages/_app.js\",\n                    lineNumber: 22,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_hot_toast__WEBPACK_IMPORTED_MODULE_2__.Toaster, {\n                    position: \"top-right\",\n                    toastOptions: {\n                        duration: 4000,\n                        style: {\n                            background: \"#363636\",\n                            color: \"#fff\"\n                        },\n                        success: {\n                            style: {\n                                background: \"#10b981\"\n                            }\n                        },\n                        error: {\n                            style: {\n                                background: \"#ef4444\"\n                            }\n                        }\n                    }\n                }, void 0, false, {\n                    fileName: \"/Users/clodoaldofavaro/Developer/jump/email-sort-app-frontend/pages/_app.js\",\n                    lineNumber: 23,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/clodoaldofavaro/Developer/jump/email-sort-app-frontend/pages/_app.js\",\n            lineNumber: 21,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/clodoaldofavaro/Developer/jump/email-sort-app-frontend/pages/_app.js\",\n        lineNumber: 20,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQyx5RUFBeUU7O0FBQ0Q7QUFDL0I7QUFDTTtBQUNqQjtBQUNFO0FBRWpDLFNBQVNLLE1BQU0sRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUU7SUFDckMsTUFBTSxDQUFDQyxZQUFZLEdBQUdKLCtDQUFRQSxDQUFDLElBQU0sSUFBSUosOERBQVdBLENBQUM7WUFDbkRTLGdCQUFnQjtnQkFDZEMsU0FBUztvQkFDUEMsT0FBTztvQkFDUEMsV0FBVyxJQUFJLEtBQUs7b0JBQ3BCQyxzQkFBc0I7Z0JBQ3hCO1lBQ0Y7UUFDRjtJQUVBLHFCQUNFLDhEQUFDWixzRUFBbUJBO1FBQUNhLFFBQVFOO2tCQUMzQiw0RUFBQ0wsd0RBQVlBOzs4QkFDWCw4REFBQ0c7b0JBQVcsR0FBR0MsU0FBUzs7Ozs7OzhCQUN4Qiw4REFBQ0wsb0RBQU9BO29CQUNOYSxVQUFTO29CQUNUQyxjQUFjO3dCQUNaQyxVQUFVO3dCQUNWQyxPQUFPOzRCQUNMQyxZQUFZOzRCQUNaQyxPQUFPO3dCQUNUO3dCQUNBQyxTQUFTOzRCQUNQSCxPQUFPO2dDQUNMQyxZQUFZOzRCQUNkO3dCQUNGO3dCQUNBRyxPQUFPOzRCQUNMSixPQUFPO2dDQUNMQyxZQUFZOzRCQUNkO3dCQUNGO29CQUNGOzs7Ozs7Ozs7Ozs7Ozs7OztBQUtWO0FBRUEsaUVBQWVkLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbWFpbC1zb3J0LWFwcC1mcm9udGVuZC8uL3BhZ2VzL19hcHAuanM/ZTBhZCJdLCJzb3VyY2VzQ29udGVudCI6WyIgLy8gTWFpbiBhcHAgY29tcG9uZW50IHdpdGggcHJvdmlkZXJzIGZvciBhdXRoZW50aWNhdGlvbiBhbmQgZGF0YSBmZXRjaGluZ1xuaW1wb3J0IHsgUXVlcnlDbGllbnQsIFF1ZXJ5Q2xpZW50UHJvdmlkZXIgfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnknO1xuaW1wb3J0IHsgVG9hc3RlciB9IGZyb20gJ3JlYWN0LWhvdC10b2FzdCc7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tICcuLi9ob29rcy91c2VBdXRoJztcbmltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJztcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcbiAgY29uc3QgW3F1ZXJ5Q2xpZW50XSA9IHVzZVN0YXRlKCgpID0+IG5ldyBRdWVyeUNsaWVudCh7XG4gICAgZGVmYXVsdE9wdGlvbnM6IHtcbiAgICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgcmV0cnk6IDEsXG4gICAgICAgIHN0YWxlVGltZTogNSAqIDYwICogMTAwMCwgLy8gNSBtaW51dGVzXG4gICAgICAgIHJlZmV0Y2hPbldpbmRvd0ZvY3VzOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSkpO1xuXG4gIHJldHVybiAoXG4gICAgPFF1ZXJ5Q2xpZW50UHJvdmlkZXIgY2xpZW50PXtxdWVyeUNsaWVudH0+XG4gICAgICA8QXV0aFByb3ZpZGVyPlxuICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICAgIDxUb2FzdGVyIFxuICAgICAgICAgIHBvc2l0aW9uPVwidG9wLXJpZ2h0XCJcbiAgICAgICAgICB0b2FzdE9wdGlvbnM9e3tcbiAgICAgICAgICAgIGR1cmF0aW9uOiA0MDAwLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyMzNjM2MzYnLFxuICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzEwYjk4MScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IHtcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2VmNDQ0NCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICA8L0F1dGhQcm92aWRlcj5cbiAgICA8L1F1ZXJ5Q2xpZW50UHJvdmlkZXI+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE15QXBwOyJdLCJuYW1lcyI6WyJRdWVyeUNsaWVudCIsIlF1ZXJ5Q2xpZW50UHJvdmlkZXIiLCJUb2FzdGVyIiwiQXV0aFByb3ZpZGVyIiwidXNlU3RhdGUiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInF1ZXJ5Q2xpZW50IiwiZGVmYXVsdE9wdGlvbnMiLCJxdWVyaWVzIiwicmV0cnkiLCJzdGFsZVRpbWUiLCJyZWZldGNoT25XaW5kb3dGb2N1cyIsImNsaWVudCIsInBvc2l0aW9uIiwidG9hc3RPcHRpb25zIiwiZHVyYXRpb24iLCJzdHlsZSIsImJhY2tncm91bmQiLCJjb2xvciIsInN1Y2Nlc3MiLCJlcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./utils/api.js":
/*!**********************!*\
  !*** ./utils/api.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);\naxios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n// API client configuration with interceptors for authentication and error handling\n\nconst API_URL = \"https://email-sort-app-backend.fly.dev/\";\nconst api = axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create({\n    baseURL: `${API_URL}/api`,\n    withCredentials: true,\n    timeout: 30000\n});\n// Request interceptor to add auth token\napi.interceptors.request.use((config)=>{\n    if (false) {}\n    return config;\n}, (error)=>{\n    return Promise.reject(error);\n});\n// Response interceptor to handle auth errors\napi.interceptors.response.use((response)=>response, (error)=>{\n    if (error.response?.status === 401 && \"undefined\" !== \"undefined\") {}\n    return Promise.reject(error);\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (api);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy9hcGkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQyxtRkFBbUY7QUFDMUQ7QUFFMUIsTUFBTUMsVUFBVUMseUNBQStCO0FBRS9DLE1BQU1HLE1BQU1MLG9EQUFZLENBQUM7SUFDdkJPLFNBQVMsQ0FBQyxFQUFFTixRQUFRLElBQUksQ0FBQztJQUN6Qk8saUJBQWlCO0lBQ2pCQyxTQUFTO0FBQ1g7QUFFQSx3Q0FBd0M7QUFDeENKLElBQUlLLFlBQVksQ0FBQ0MsT0FBTyxDQUFDQyxHQUFHLENBQzFCLENBQUNDO0lBQ0MsSUFBSSxLQUFrQixFQUFhLEVBS2xDO0lBQ0QsT0FBT0E7QUFDVCxHQUNBLENBQUNNO0lBQ0MsT0FBT0MsUUFBUUMsTUFBTSxDQUFDRjtBQUN4QjtBQUdGLDZDQUE2QztBQUM3Q2QsSUFBSUssWUFBWSxDQUFDWSxRQUFRLENBQUNWLEdBQUcsQ0FDM0IsQ0FBQ1UsV0FBYUEsVUFDZCxDQUFDSDtJQUNDLElBQUlBLE1BQU1HLFFBQVEsRUFBRUMsV0FBVyxPQUFPLGdCQUFrQixhQUFhLEVBR3BFO0lBQ0QsT0FBT0gsUUFBUUMsTUFBTSxDQUFDRjtBQUN4QjtBQUdGLGlFQUFlZCxHQUFHQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZW1haWwtc29ydC1hcHAtZnJvbnRlbmQvLi91dGlscy9hcGkuanM/YzExMyJdLCJzb3VyY2VzQ29udGVudCI6WyIgLy8gQVBJIGNsaWVudCBjb25maWd1cmF0aW9uIHdpdGggaW50ZXJjZXB0b3JzIGZvciBhdXRoZW50aWNhdGlvbiBhbmQgZXJyb3IgaGFuZGxpbmdcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5cbmNvbnN0IEFQSV9VUkwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUElfVVJMO1xuXG5jb25zdCBhcGkgPSBheGlvcy5jcmVhdGUoe1xuICBiYXNlVVJMOiBgJHtBUElfVVJMfS9hcGlgLFxuICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gIHRpbWVvdXQ6IDMwMDAwLFxufSk7XG5cbi8vIFJlcXVlc3QgaW50ZXJjZXB0b3IgdG8gYWRkIGF1dGggdG9rZW5cbmFwaS5pbnRlcmNlcHRvcnMucmVxdWVzdC51c2UoXG4gIChjb25maWcpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2F1dGhUb2tlbicpO1xuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIGNvbmZpZy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dG9rZW59YDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfSxcbiAgKGVycm9yKSA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgfVxuKTtcblxuLy8gUmVzcG9uc2UgaW50ZXJjZXB0b3IgdG8gaGFuZGxlIGF1dGggZXJyb3JzXG5hcGkuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLnVzZShcbiAgKHJlc3BvbnNlKSA9PiByZXNwb25zZSxcbiAgKGVycm9yKSA9PiB7XG4gICAgaWYgKGVycm9yLnJlc3BvbnNlPy5zdGF0dXMgPT09IDQwMSAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2F1dGhUb2tlbicpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2xvZ2luJztcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgYXBpOyJdLCJuYW1lcyI6WyJheGlvcyIsIkFQSV9VUkwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQVBJX1VSTCIsImFwaSIsImNyZWF0ZSIsImJhc2VVUkwiLCJ3aXRoQ3JlZGVudGlhbHMiLCJ0aW1lb3V0IiwiaW50ZXJjZXB0b3JzIiwicmVxdWVzdCIsInVzZSIsImNvbmZpZyIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiZXJyb3IiLCJQcm9taXNlIiwicmVqZWN0IiwicmVzcG9uc2UiLCJzdGF0dXMiLCJyZW1vdmVJdGVtIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./utils/api.js\n");

/***/ }),

/***/ "./utils/storage.js":
/*!**************************!*\
  !*** ./utils/storage.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   storage: () => (/* binding */ storage)\n/* harmony export */ });\n// Client-side storage utilities for authentication data\nconst storage = {\n    getToken: ()=>{\n        if (true) return null;\n        return localStorage.getItem(\"authToken\");\n    },\n    setToken: (token)=>{\n        if (true) return;\n        localStorage.setItem(\"authToken\", token);\n    },\n    removeToken: ()=>{\n        if (true) return;\n        localStorage.removeItem(\"authToken\");\n    },\n    getUser: ()=>{\n        if (true) return null;\n        const user = localStorage.getItem(\"user\");\n        return user ? JSON.parse(user) : null;\n    },\n    setUser: (user)=>{\n        if (true) return;\n        localStorage.setItem(\"user\", JSON.stringify(user));\n    },\n    removeUser: ()=>{\n        if (true) return;\n        localStorage.removeItem(\"user\");\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy9zdG9yYWdlLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQyx3REFBd0Q7QUFDbEQsTUFBTUEsVUFBVTtJQUNuQkMsVUFBVTtRQUNSLElBQUksSUFBa0IsRUFBYSxPQUFPO1FBQzFDLE9BQU9DLGFBQWFDLE9BQU8sQ0FBQztJQUM5QjtJQUVBQyxVQUFVLENBQUNDO1FBQ1QsSUFBSSxJQUFrQixFQUFhO1FBQ25DSCxhQUFhSSxPQUFPLENBQUMsYUFBYUQ7SUFDcEM7SUFFQUUsYUFBYTtRQUNYLElBQUksSUFBa0IsRUFBYTtRQUNuQ0wsYUFBYU0sVUFBVSxDQUFDO0lBQzFCO0lBRUFDLFNBQVM7UUFDUCxJQUFJLElBQWtCLEVBQWEsT0FBTztRQUMxQyxNQUFNQyxPQUFPUixhQUFhQyxPQUFPLENBQUM7UUFDbEMsT0FBT08sT0FBT0MsS0FBS0MsS0FBSyxDQUFDRixRQUFRO0lBQ25DO0lBRUFHLFNBQVMsQ0FBQ0g7UUFDUixJQUFJLElBQWtCLEVBQWE7UUFDbkNSLGFBQWFJLE9BQU8sQ0FBQyxRQUFRSyxLQUFLRyxTQUFTLENBQUNKO0lBQzlDO0lBRUFLLFlBQVk7UUFDVixJQUFJLElBQWtCLEVBQWE7UUFDbkNiLGFBQWFNLFVBQVUsQ0FBQztJQUMxQjtBQUNGLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbWFpbC1zb3J0LWFwcC1mcm9udGVuZC8uL3V0aWxzL3N0b3JhZ2UuanM/OGRlMyJdLCJzb3VyY2VzQ29udGVudCI6WyIgLy8gQ2xpZW50LXNpZGUgc3RvcmFnZSB1dGlsaXRpZXMgZm9yIGF1dGhlbnRpY2F0aW9uIGRhdGFcbmV4cG9ydCBjb25zdCBzdG9yYWdlID0ge1xuICAgIGdldFRva2VuOiAoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhdXRoVG9rZW4nKTtcbiAgICB9LFxuICAgIFxuICAgIHNldFRva2VuOiAodG9rZW4pID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2F1dGhUb2tlbicsIHRva2VuKTtcbiAgICB9LFxuICAgIFxuICAgIHJlbW92ZVRva2VuOiAoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhdXRoVG9rZW4nKTtcbiAgICB9LFxuICAgIFxuICAgIGdldFVzZXI6ICgpID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuIG51bGw7XG4gICAgICBjb25zdCB1c2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKTtcbiAgICAgIHJldHVybiB1c2VyID8gSlNPTi5wYXJzZSh1c2VyKSA6IG51bGw7XG4gICAgfSxcbiAgICBcbiAgICBzZXRVc2VyOiAodXNlcikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcbiAgICB9LFxuICAgIFxuICAgIHJlbW92ZVVzZXI6ICgpID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXInKTtcbiAgICB9LFxuICB9OyJdLCJuYW1lcyI6WyJzdG9yYWdlIiwiZ2V0VG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic2V0VG9rZW4iLCJ0b2tlbiIsInNldEl0ZW0iLCJyZW1vdmVUb2tlbiIsInJlbW92ZUl0ZW0iLCJnZXRVc2VyIiwidXNlciIsIkpTT04iLCJwYXJzZSIsInNldFVzZXIiLCJzdHJpbmdpZnkiLCJyZW1vdmVVc2VyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./utils/storage.js\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ "@tanstack/react-query":
/*!****************************************!*\
  !*** external "@tanstack/react-query" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@tanstack/react-query");;

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ }),

/***/ "react-hot-toast":
/*!**********************************!*\
  !*** external "react-hot-toast" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = import("react-hot-toast");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_app.js")));
module.exports = __webpack_exports__;

})();