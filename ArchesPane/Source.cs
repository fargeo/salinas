using System;
using System.Windows;
using System.Collections.Generic;

namespace ArchesPane.Dockpane1View
{
    public partial class ItemsControlDataBinding : Window
    {
        public ItemsControlDataBinding()
        {
            InitializeComponent();

            List<ArchesAttribute> items = new List<ArchesAttribute>();
            items.Add(new ArchesAttribute() {Name = "attr1", Desc = "Attribute #1" });
            items.Add(new ArchesAttribute() {Name = "attr2", Desc = "Attribute #2" });
            items.Add(new ArchesAttribute() {Name = "attr3", Desc = "Attribute #3" });

            ArchesAttributeList.ItemsSource = items;
        }
    }

    public class ArchesAttribute
    {
        public string Name { get; set; }
        public string Desc { get; set; }
    }
}