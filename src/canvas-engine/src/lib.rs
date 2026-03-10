use wasm_bindgen::prelude::*;

struct Item {
    id: u32,
    text: String,
    x: f64, y: f64,
    w: f64, h: f64,
}

#[wasm_bindgen]
pub struct CanvasState {
    items: Vec<Item>,
    next_id: u32,
}

#[wasm_bindgen]
impl CanvasState {
    #[wasm_bindgen(constructor)]
    pub fn new() -> CanvasState {
        CanvasState {
            items: Vec::new(),
            next_id: 0,
        }
    }

    pub fn add_item(&mut self, text: String, x: f64, y: f64, w: f64, h: f64) -> u32 {
        let id = self.next_id;
        self.next_id += 1;
        self.items.push(Item { id, text, x, y, w, h });
        id
    }

    pub fn get_items_json(&self) -> String {
        let parts: Vec<String> = self.items.iter()
            .map(|item| {
                let escaped = item.text.replace('\\', "\\\\").replace('"', "\\\"");
                format!(
                    r#"{{"id":{},"text":"{}","x":{},"y":{},"w":{},"h":{}}}"#,
                    item.id, escaped, item.x, item.y, item.w, item.h
                )
            })
            .collect();
        format!("[{}]", parts.join(","))
    }
}
