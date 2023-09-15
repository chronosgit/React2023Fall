class EventEmitter {
    constructor() {
        this.eventCache = {};
    }

    subscribe(event, cb) {
        if(!this.eventCache.hasOwnProperty(event)) {
            this.eventCache[event] = [];
        }

        const listeners = this.eventCache.hasOwnProperty(event) ? this.eventCache[event] : []; 
        // someEvent: [callback1, callback2 ...]
        listeners.push(cb);

        return {
            unsubscribe: () => {
                for(let i = 0; i < listeners.length; i++) {
                    if(listeners[i] === cb) {
                        listeners.splice(i, 1);
                    }
                }
            }
        };
    }

    emit(event, args = []) {
        if (!this.eventCache.hasOwnProperty(event)) {
            return [];
        }

        const listeners = this.eventCache.hasOwnProperty(event) ? this.eventCache[event] : []
        const results = [];

        for (let i = 0; i < listeners.length; i++) {
            results.push(listeners[i](...args));
        }

        return results;
    }
}